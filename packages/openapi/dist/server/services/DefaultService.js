/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a batch transaction
*
* body InlineObject  (optional)
* returns SafeTransaction
* */
const createBatchTransaction = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        body,
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
* Fetch details of an OpenSea asset
*
* contractAddress String Contract address for the token to lookup
* id String Token ID to lookup
* network String Ethereum network (Rinkeby / Homestead)
* returns Object
* */
const getAsset = ({ contractAddress, id, network }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contractAddress,
        id,
        network,
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
  createBatchTransaction,
  getAsset,
};
