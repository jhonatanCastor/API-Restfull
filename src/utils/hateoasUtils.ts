import { User } from "@prisma/client"

export const addLinksToEntityResponse = (entity: any, domain: string) => {
  const url = process.env.URL

  return {
    ...entity,
    links: {
      self: `${url}/${domain}/${entity.uid}`,
      [domain]: `${url}/${domain}`,
    },
  }
};

export const addLinksToEntityList = (entities: any[], domain: string) => {
  return entities.map(entity => addLinksToEntityResponse(entity, domain));
}

export const removeSensitivyContentFromUser = ({ password, ...user }: User): Partial<User> => user
