
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceNames: faker.lorem.sentence(""),
action: faker.lorem.sentence(""),
details: faker.lorem.sentence(""),
createdBy: faker.lorem.sentence("8"),
updatedBy: faker.lorem.sentence(""),
method: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
