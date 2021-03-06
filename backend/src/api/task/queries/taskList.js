const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  taskList(filter: TaskFilterInput, limit: Int, offset: Int, orderBy: TaskOrderByEnum): TaskPage!
`;

const resolver = {
  taskList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskRead);

    return new TaskService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
