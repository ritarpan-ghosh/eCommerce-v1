"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  create: async (ctx) => {
    if (ctx.request.body) {
      const { products } = ctx.request.body;
      // console.log({ products });
      try {
        const lineItems = await Promise.all(
          products.map(async (product) => {
            const item = await strapi
              .service("api::product.product")
              .findOne(product.id);

            console.log("this is item------->", item);
            console.log("this is product------->", product);

            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: item.title,
                  description: item.description,
                  metadata: {
                    item_id: item.id
                  }
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: product.quantity,
            };
          })
        );

        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: { allowed_countries: ["IN"] },
          payment_method_types: ["card"],
          mode: "payment",
          success_url: process.env.CLIENT_URL + `/success`,
          cancel_url: process.env.CLIENT_URL + "/failed",
          line_items: lineItems,
        });

        await strapi
          .service("api::order.order")
          .create({ data: { products, stripe_session_id: session.id } });

        return { stripeSession: session };
      } catch (error) {
        ctx.response.status = 500;
        console.log(error);
      }
    }else{
      throw new Error('Request body is undefined')
    }
  },
}));
