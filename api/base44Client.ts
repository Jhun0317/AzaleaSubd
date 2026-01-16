export const base44 = {
  entities: {
    DuesSetting: {
      list: async () => [],
      create: async (data: any) => data,
      update: async (_id: any, data: any) => data,
    },
    Payment: {
      filter: async () => [],
      update: async (_id: any, data: any) => data,
    },
    Resident: {
      list: async () => [],
    },
    Announcement: {
      create: async (data: any) => data,
    },
    Document: {
      create: async (data: any) => data,
    },
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: "" }),
    },
  },
}
