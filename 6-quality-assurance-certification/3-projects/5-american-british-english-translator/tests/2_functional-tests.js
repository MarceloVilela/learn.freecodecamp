const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

const statusBadRequest = 200;

suite('Functional Tests', () => {

  test('Translation with text and locale fields: POST request to /api/translate', function (done) {
    const text = 'Mangoes are my favorite fruit.'
    const locale = 'american-to-british';
    const translation = translator.translate(text, locale);

    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, text);
        assert.equal(res.body.translation, translation);
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
    const text = 'Mangoes are my favorite fruit.'
    const locale = 'american-to-portuguese';

    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end(function (err, res) {
        assert.equal(res.status, statusBadRequest);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', function (done) {
    const locale = 'american-to-british';

    chai.request(server)
      .post('/api/translate')
      .send({ locale })
      .end(function (err, res) {
        assert.equal(res.status, statusBadRequest);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', function (done) {
    const text = 'Mangoes are my favorite fruit.'

    chai.request(server)
      .post('/api/translate')
      .send({ text })
      .end(function (err, res) {
        assert.equal(res.status, statusBadRequest);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', function (done) {
    const text = ''
    const locale = 'american-to-british';

    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end(function (err, res) {
        assert.equal(res.status, statusBadRequest);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
    const text = 'ok'
    const locale = 'american-to-british';

    chai.request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end(function (err, res) {
        assert.equal(res.status, statusBadRequest);
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
