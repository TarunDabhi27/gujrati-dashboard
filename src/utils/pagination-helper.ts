export default function paginationHelper(keyArgs?: any) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs: keyArgs,
    // read: function (existing, { args: { limit = existing.length } }) {
    //   if (existing && existing.nodes.length > limit) {
    //     return {
    //       nodes: [...existing.nodes].splice(limit - 1),
    //       pageInfo: {
    //         ...existing.pageInfo,
    //         cursor: existing.nodes.find((_, i) => i === limit - 1).cursor,
    //       },
    //     };
    //   }
    // },
    merge: function (existing, incoming, _a) {
      if (!existing) {
        existing = makeEmptyData();
      }

      if (!incoming) {
        return existing;
      }

      if (existing.pageInfo.cursor === incoming.pageInfo.cursor) {
        return existing;
      }

      return {
        nodes: [...(existing && existing.nodes ? existing.nodes : []), ...incoming.nodes],
        pageInfo: { ...existing.pageInfo, ...incoming.pageInfo },
      };
    },
  };
}

function makeEmptyData() {
  return {
    nodes: [],
    pageInfo: {
      cursor: '',
    },
  };
}
