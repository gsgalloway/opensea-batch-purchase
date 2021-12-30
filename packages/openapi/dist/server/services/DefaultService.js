/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Fetch details of an OpenSea asset
*
* contractAddress String Contract address for the token to lookup
* id String Token ID to lookup
* no response value expected for this operation
* */
const getAsset = ({ contractAddress, id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contractAddress,
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Greet a user
*
* returns String
* */
const hello = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getAsset,
  hello,
};
