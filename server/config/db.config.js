import pg from "pg";

const dbConfig = {
  user: "postgres",
  host: "localhost",
  password: "postgres",
  port: 5427,
  database: "matcha",
};
const pool = new pg.Client(dbConfig);
pool
  .connect()
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

const CreateMatchingStatus = `
  DO $$
BEGIN
    IF NOT EXISTS ( SELECT 1 FROM pg_type WHERE typname = 'matchingstatus') THEN
        CREATE TYPE MatchingStatus AS ENUM('LIKE', 'DISLIKE');
    END IF;
END$$;
  `;

const CreateGenderTypeQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='gendertype') THEN
    CREATE TYPE GenderType AS ENUM('MALE', 'FEMALE');
  END IF;
END$$;
`;

const CreateTagsQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tag') THEN
    CREATE TYPE TAG AS ENUM('vegan', 'geek', 'piercing');
  END IF;
END$$;
`;

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT false,
    enabled BOOLEAN DEFAULT true,
    verification_key TEXT,
    verification_end_date TIMESTAMPTZ,
    reset_key TEXT,
    reset_end_date TIMESTAMPTZ,
    gender GenderType,
    biography TEXT,
    default_cover TEXT,
    last_time_connected TIMESTAMPTZ,
    birthday DATE,
    token TEXT,
    refresh_token TEXT,
    tags TAG[],
    sexual_preference GenderType[],
    location GEOGRAPHY(Point, 4326),
    fame_rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

const CreateVisitHistoryQuery = `
CREATE TABLE IF NOT EXISTS visit_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user" (id),
  visited_user_id INTEGER REFERENCES "user" (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`;
const CreateConnectedProfilesQuery = `
CREATE TABLE IF NOT EXISTS connected_profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user" (id),
  connected_user_id INTEGER REFERENCES "user" (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  connected BOOLEAN DEFAULT(false),
  status  MatchingStatus
);
`;

const CreateBlockedAccountQuery = `
CREATE TABLE IF NOT EXISTS blocked_account (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user" (id),
  blocked_user_id INTEGER REFERENCES "user" (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

const CreateConversationQuery = `
CREATE TABLE IF NOT EXISTS conversation (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES "user" (id),
  reciever_id INTEGER REFERENCES "user" (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  message TEXT
);
`;


// const CreateSexualPreferences = ` CREATE TABLE IF NOT EXISTS SexualPreference (
//       id SERIAL PRIMARY KEY,
//       user_id INTEGER REFERENCES "user" (id),
//       preference GenderType NOT NULL
// );
// `;

const CreateProfileQuery = `CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user" (id),
  cover   VARCHAR(255)
);`;

// const user_likes = `
//   CREATE TABLE IF NOT EXISTS user_likes (
//   user_id_liked INTEGER NOT NULL,
//   user_id_liker INTEGER NOT NULL,
//   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//   PRIMARY KEY (user_id_liked, user_id_liker)
// );`;

// const user_Matches = `
//   CREATE TABLE IF NOT EXISTS user_matches (
//    id SERIAL PRIMARY KEY,
//    user_id INTEGER NOT NULL,
//    matched_user_id INTEGER NOT NULL,
//    created_at TIMESTAMP DEFAULT NOW(),
//    FOREIGN KEY (user_id) REFERENCES "user"(id),
//    FOREIGN KEY (matched_user_id) REFERENCES "user"(id)
// );`;

// GENDER_TYPE
pool.query(CreateGenderTypeQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Geneder type enum created successfully");
  }
});

// TAGS
pool.query(CreateTagsQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Tag enum type created successfully");
  }
});

// USER
pool.query(createUserTableQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User table created successfully");
  }
});

// MATCHING_STATUS
pool.query(CreateMatchingStatus, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("MATCHING_STATUS enum created successfully");
  }
})

// VisitHisotry
pool.query(CreateVisitHistoryQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("VisitHisotry table created successfully");
  }
})

// ConnectedProfiles
pool.query(CreateConnectedProfilesQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("ConnectedProfiles table created successfully");
  }
})

// BlockedAccount
pool.query(CreateBlockedAccountQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("BlockedAccount table created successfully");
  }
})

// Conversation
pool.query(CreateConversationQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Conversation table created successfully");
  }
})

// PROFILE
pool.query(CreateProfileQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Profile table created successfully");
  }
});



// PostGis
// pool.query(CreatePostGisExtension, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("postgis extension created successfully");
//   }
// });


export default pool;
