const tf = require('@tensorflow/tfjs-node');
const {handleScanError} = require('./errorHandler')

const postScanSkinInformation = async (model, image) => {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = await model.predict(tensor);

        const SkinClass = ['dry', 'oily', 'normal'];
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const skinCondition = SkinClass[classResult];

        return skinCondition;

    } catch(error) {
        await handleScanError(error);
    }
}

const postScanDiseaseJerawat = async (model, image) => {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = await model.predict(tensor).data();
        const probability = prediction[0];
        const threshold = 0.5;

        if (probability > threshold){
            return "berjerawat";
        } else {
            return "tidak berjerawat";
        }
    } catch(error) {
        await handleScanError(error);
    }
}

const getMessageStatus = async (skinModel, diseaseModel, image) => {
    try {
        let message;

        if (await postScanSkinInformation(skinModel, image) && await postScanDiseaseJerawat(diseaseModel, image)) {
            message = "scan is working";
        } else {
            message = "scan have problem";
        }

        return message;    
    } catch(error) {
        await handleScanError(error);
    }
}

module.exports = { 
    postScanSkinInformation,
    postScanDiseaseJerawat,
    getMessageStatus,
}