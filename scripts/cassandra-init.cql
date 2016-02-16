DROP KEYSPACE IF EXISTS remax;

CREATE KEYSPACE remax WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

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


CREATE TABLE house (
  id text,
  street text,
  price bigint,
  PRIMARY KEY (id,mls));

CREATE INDEX  house_city ON house( city);
CREATE INDEX  house_zip ON house( zip);
CREATE INDEX  house_type ON house( type);

  CREATE TABLE image (
    house_id uuid,
    url text,
    PRIMARY KEY (url));

 CREATE INDEX house_image ON image(house_id);

CREATE TABLE city (
  id uuid,
  name text,
  PRIMARY KEY (name));

CREATE TABLE zip (
 id uuid,
  zip text,
  PRIMARY KEY (zip));

CREATE TABLE type (
 id uuid,
  type text,
  PRIMARY KEY (type));

  CREATE TABLE city_zip (
  id text,
  city text,
  zip text,
  number counter,
  PRIMARY KEY (id,city,zip));


    CREATE TABLE city_type (
    id text,
    city text,
    type text,
    number counter,
    PRIMARY KEY (id,city,type));


CREATE TABLE zip_type (
    id text,
    zip text,
    type text,
    number counter,
    PRIMARY KEY (id,zip,type));

