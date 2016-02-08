USE remax;

CREATE TABLE "User"(
  id uuid PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "User_DisplayName" varchar,
  "User_ProfilePhoto" varchar,
  "User_Email" varchar,
  "User_Locale" varchar
);

CREATE INDEX User_username_ix ON "User"( username );

insert into "User"( id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email", "User_Locale" )
values( d362e1df-1fa8-466b-b311-af90b2a71e8e, 'jack', 'secret', 'Jack Van Der Cub', '/profile_photos/jack.jpg', 'jack@example.com', '' );

insert into "User"( id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email", "User_Locale" )
values( 33171548-39d3-45d8-ab5c-5eedefe01dfc, 'jill', 'birthday', 'Jill McBear', '/profile_photos/jill.jpg', 'jill@example.com', '' );


