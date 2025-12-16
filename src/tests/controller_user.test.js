/* eslint-disable no-undef */
const mongo = require("../../mongo_conn_native").Connection;
const user = require("./../model/auth/user_auth")
const userProfile = require("../model/user/profile");
const auth = require("./../model/auth/auth")
const supertest = require("supertest");
const app = require("../../server");
const publicRouter = require("../restAPI/routes/route_public");
supertest(app.use(publicRouter));

describe("contain user apis", function () {

    let testId;

    // beforeAll(async () => {
    // }, 10000);

    afterAll(async () => {
        await user.deleteOne({ userId: testId });
        await auth.deleteOne({ userId: testId });
        await userProfile.deleteOne({ username: "username_sample_test" });
        mongo.close();
    });


    const data = {
        firstName: "first_name_sample_test", // mandatory
        lastName: "last_name_sample_test",
        username: "username_sample_test"
    };

    describe("contain create api cases", () => {
        it("a new user should be created successfully", async () => {
            const res = await supertest(app)
                .put("/create")
                .send({ data })
                .set("Accept", "application/json")
                .expect(201);
            
            testId = res.body.result.data.result._id

        });

        it("should fail because of empty body", async () => {
            await supertest(app)
                .put("/create")
                .send({
                    /* empty body */
                })
                .set("Accept", "application/json")
                .expect(400);
        });
    });

    // describe("contain update api cases", () => {
    //     it("should update existing user data successfully", async () => {
    //         data.first_name = "my new name";
    //         await request
    //             .post("/update")
    //             .send({ data })
    //             .set("Accept", "application/json")
    //             .expect(200);
    //     });

        // it("should fail since there is no user", async () => {
        //     data.username = "notExist";
        //     await request
        //         .post("/update")
        //         .send({ data })
        //         .set("Accept", "application/json")
        //         .expect(401);
        // });
    // });
});
