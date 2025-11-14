// services/ContactService.js

import { Contact } from "../models/index.js";

export const createContact = async (body) => {
  try {
    const contact = await Contact.create(body);

    return {
      status: "SUCCESS",
      data: contact,
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return {
      status: "SERVER_ERROR",
      message: "Internal server error",
    };
  }
};

export const getContacts = async (userId) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    for (let ann of contacts) {
      if (!ann.readBy.includes(userId)) {
        ann.readBy.push(userId);
        await ann.save({ validateBeforeSave: false });
      }
    }

    return {
      status: "SUCCESS",
      data: contacts,
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      status: "SERVER_ERROR",
      message: "Internal server error",
    };
  }
};
