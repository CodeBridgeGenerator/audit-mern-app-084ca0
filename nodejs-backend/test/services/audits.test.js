const assert = require("assert");
const app = require("../../src/app");

describe("audits service", () => {
  let thisService;
  let auditCreated;

  beforeEach(async () => {
    thisService = await app.service("audits");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (audits)");
  });

  describe("#create", () => {
    const options = {"serviceNames":"new value","action":"new value","details":"new value","createdBy":"new value","updatedBy":"new value","method":"new value"};

    beforeEach(async () => {
      auditCreated = await thisService.create(options);
    });

    it("should create a new audit", () => {
      assert.strictEqual(auditCreated.serviceNames, options.serviceNames);
assert.strictEqual(auditCreated.action, options.action);
assert.strictEqual(auditCreated.details, options.details);
assert.strictEqual(auditCreated.createdBy, options.createdBy);
assert.strictEqual(auditCreated.updatedBy, options.updatedBy);
assert.strictEqual(auditCreated.method, options.method);
    });
  });

  describe("#get", () => {
    it("should retrieve a audit by ID", async () => {
      const retrieved = await thisService.get(auditCreated._id);
      assert.strictEqual(retrieved._id, auditCreated._id);
    });
  });

  describe("#update", () => {
    let auditUpdated;
    const options = {"serviceNames":"updated value","action":"updated value","details":"updated value","createdBy":"updated value","updatedBy":"updated value","method":"updated value"};

    beforeEach(async () => {
      auditUpdated = await thisService.update(auditCreated._id, options);
    });

    it("should update an existing audit ", async () => {
      assert.strictEqual(auditUpdated.serviceNames, options.serviceNames);
assert.strictEqual(auditUpdated.action, options.action);
assert.strictEqual(auditUpdated.details, options.details);
assert.strictEqual(auditUpdated.createdBy, options.createdBy);
assert.strictEqual(auditUpdated.updatedBy, options.updatedBy);
assert.strictEqual(auditUpdated.method, options.method);
    });
  });

  describe("#delete", () => {
  let auditDeleted;
    beforeEach(async () => {
      auditDeleted = await thisService.remove(auditCreated._id);
    });

    it("should delete a audit", async () => {
      assert.strictEqual(auditDeleted._id, auditCreated._id);
    });
  });
});