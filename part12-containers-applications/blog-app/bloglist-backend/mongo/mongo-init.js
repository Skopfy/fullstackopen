db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database',
        },
    ],
});

db.createCollection('blogs')
db.blogs.insert({ title: 'Write code', author: "Moikka", url: "moikka.com" });
db.createCollection('users')