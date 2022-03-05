import passport from "passport";
import User from "../models/user";

import {Strategy as TwitterStrategy} from "passport-twitter";

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_key + "",
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET + "",
  callbackURL: process.env.TWITTER_CALLBACK_URL + "",
},
  async (accessToken:any, refreshToken: any, profile: any, done: any) => {
    const user = await User.findOne({federated: {id: profile.id}});
    if (user) {
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
          provider: 'twitter'
        }
      }).save();
      console.log(`profile: ${JSON.stringify(profile)}`);
      done(null, newUser);
    }
  }
));


passport.serializeUser((user: any, done) => {
  done(null, user.federated.id);
}
);
passport.deserializeUser(async (id, done) => {
  const user = await User.find({ federated: { id } });
  done(null, user);
}
);