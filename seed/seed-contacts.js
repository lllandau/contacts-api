/* eslint no-console: 0 */
const faker = require("faker");
const mongoose = require("mongoose");

const Contact = require("../model/Contact");

async function seedContacts() {
  mongoose.connect(
    "mongodb://localhost:27017/contacts-api",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  mongoose.connection.on("error", console.error);

  try {
    await Contact.deleteMany({});
    console.log("Contacts purged!");
  } catch (err) {
    console.error(err);
  }

  const contactPromises = Array(15)
    .fill(null)
    .map(() => {
      const contact = new Contact({
        person: {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName()
        },

        adress: {
          City: `${faker.address.cityPrefix()} ${faker.name.firstName()} ${faker.address.citySuffix()}`
          //ZIP: faker.random.number(99999).toString(10),
          //Street_Adress: faker.address.streetAddress()
        },
        phone: {
          //mobile_private: faker.random.number(99999999),
          //mobile_business: faker.random.number(99999999),
          landline: faker.random.number(99999999)
        }
        //email: faker.internet.email()
      });

      return contact.save();
    });

  try {
    await Promise.all(contactPromises);
    console.log("Contacts seeded!");
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
}

seedContacts();
