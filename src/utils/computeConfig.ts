import { Object } from 'core-js';
import { Computed, Config } from 'types';
import computePaths from 'utils/computePaths';
import getArgumentDefaults from 'utils/getArgumentDefaults';
import readCosmiconfig from 'utils/readCosmiconfig';

/**
 * Returns a promise configuration with properly computed properties.
 * @param params Configuration object / cli parameters.
 */

export default function(params: Config = {}): Promise<Computed> {
  return new Promise((resolve, reject) => {
    readCosmiconfig()
      .then(cosmiconfig => {
        const config: Config = Object.assign(
          {},
          getArgumentDefaults(),
          params,
          cosmiconfig
        );
        resolve(<Computed>Object.assign({}, config, {
          paths: computePaths(config, [
            ...(params.paths || []),
            ...(cosmiconfig.paths || []),
          ]),
        }));
      })
      .catch(err => {
        reject(err);
      });
  });
}