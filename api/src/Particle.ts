import https from 'https';
import bent from 'bent';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'trace',
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
    ignore: 'pid,hostname'
  }
});

export class Particle {
  private hostname = `https://api.particle.io/v1/devices`;
  private token = process.env.TKNParticle || '';

  constructor() {
    this.authenticate();
  }

  private async authenticate() {
    const options: https.RequestOptions = {
      hostname: 'api.particle.io',
      path: `/v1/devices?access_token=${this.token}`,
      timeout: 5000
    };

    const req = https // does await need to be on this?
      .get(options, res => {
        var authResults: string =
          res.statusCode == 200
            ? (authResults = 'success')
            : (authResults = 'failed');
        logger.debug(
          `[services/Particle] ${res.statusCode}: ${res.statusMessage}`
        );
      })
      .on('error', error => {
        logger.error(`[services/Particle] ${error.name}: ${error.message}`);
      });

    req.on('error', e => {
      logger.error(`[server/Particle] ${e}`);
    });

    req.end();
  }

  async getAllDevices() {
    const url = `${this.hostname}/?access_token=${this.token}`;

    const getJSON = bent('json');

    return await getJSON(`${url}`).then(res => {
      logger.trace('[services/Particle] %O', res);

      return res;
    });
  }

  async getDeviceById(id: string) {
    const url = `${this.hostname}/${id}/?access_token=${this.token}`;

    const getJSON = bent('json');

    return await getJSON(url).then(res => {
      logger.trace('[services/Particle] %O', res);

      return res[0];
    });
  }
}
