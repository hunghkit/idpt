const schema = `
  type Record {
    id: String!
    host: Cased!
    owner: Patient!
    description: String
    state: StateEnum!
    status: StatusEnum
    createdAt: DateTime
    updatedAt: DateTime
    roadmaps: [Roadmap!]
  }

  type Epic {
    id: String!
    host: Task!
    state: StateEnum!
    completionRequired: Boolean
    children: [Epic]
  }
`;

const resolver = {
  Epic: {
    id: (instance) => instance._id,
    host: (instance) => instance.task,
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  }
};

exports.schema = schema;
exports.resolver = resolver;
