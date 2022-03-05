import passport from "passport";
import User from "../models/user";

import {Strategy as GitHubStrategy} from "passport-github2";

// implement passport strategy for github login
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID + "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET + "",
  callbackURL: process.env.GITHUB_CALLBACK_URL + "",
},
async (accessToken: any, refreshToken: any, profile: any, done:any) => {
  const user = await User.findOne({ githubId: profile.id });
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
        provider: 'github'
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