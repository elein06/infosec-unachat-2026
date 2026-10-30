const assert = require('assert');

describe('prueba de fallo intencional', function () {
  it('debe fallar para bloquear el despliegue', function () {
    assert.strictEqual(1, 2);
  });
});
