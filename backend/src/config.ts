/* istanbul ignore file */
import ConfigBase from 'commons/configBase';

export default class Config extends ConfigBase {
  static PORT: number = parseInt(`${process.env.PORT || 3001}`);
  static CHAIN_ID: number = parseInt(`${process.env.CHAIN_ID || 1}`);
  static AUTH_MSG: string = `${process.env.AUTH_MSG || 'Authentication to Poseidon. Timestamp <timestamp>'}`;
}
