import passport from "passport";
import User from "../models/user";

import {Strategy as GoogleStrategy} from "passport-google-oauth20";

// implement passport strategy for github login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID + "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET + "",
  callbackURL: process.env.GOOGLE_CALLBACK_URL + "",
},
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({federated: {id: profile.id}});
    if (user) {
      console.log(`user found: ${user.federated.displayName}`);
      done(null, user);
    } else {
      const newUser = await new User({
        federated: {
          id: profile.id,
          displayName: profile.displayName,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
          picture: profile._json.picture,
          token: accessToken,
          provider: 'google'
        }
      }).save();
      console.log(`profile: ${JSON.stringify(profile)}`);
      console.log(`new user created: ${newUser.federated.displayName}`);
      done(null, newUser);
    }
  }
));


passport.serializeUser((user: any, done) => {
  console.log(`user: ${JSON.stringify(user)}`);
  done(null, user.federated.id);
}
);
passport.deserializeUser(async (id, done) => {
  const user = await User.find({ federated: { id } });
  done(null, user);
}
);