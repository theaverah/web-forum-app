const mongoose = require('mongoose');
const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

// Connect to MongoDB with a callback function
mongoose.connect('mongodb://localhost:27017/ccapdev', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.error('Error connecting to MongoDB:', error);
        return;
    }

// Define all sample users
    const users = [
        {
            username: '@Artistic-Soul-56',
            displayName: 'tk.trixie',
            password: 'iLoveCats12345',
            bio: 'cat lover since birth <33',
            following: 143,
            followers: 432,
            icon: 'images/user-1.png'
        },
        {
            username: '@Historical-Tree-5688',
            displayName: 'junjun.magtibay',
            password: 'auqnamaboohai000',
            bio: 'rorw',
            following: 0,
            followers: 2435,
            icon: 'images/user-2.png'
        },
        {
            username: '@Careful-Jellyfish-479',
            displayName: 'Angiee',
            password: 'ohanameansfamily123',
            bio: 'I love my family',
            following: 245,
            followers: 675,
            icon: 'images/user-3.png'
        },
        {
            username: '@CozyBlanket',
            displayName: 'cozyblanket',
            password: 'warm&snuggly123',
            bio: 'Lover of all things cozy and warm 🌟',
            following: 102,
            followers: 207,
            icon: 'images/user-4.png'
        },
        {
            username: '@GamerGirl23',
            displayName: 'gamer_girl',
            password: 'gameon1234',
            bio: 'Gamer girl extraordinaire 🎮 Streaming on Twitch every weekend!',
            following: 305,
            followers: 1520,
            icon: 'images/user-5.png'
        }
    ];

// Define sample posts with associated usernames
    const posts = [
        {
            title: 'street kid by razon/starbucks bit me :(',
            content: 'I was walking home from class kanina 10pm and one of the street kids bit my arm out of nowhere (I was wearing a jacket so it didn\'t leave a wound) I usually just ignore the kids but this time I\'m genuinely annoyed/concerned about safety Who can I report this to? The police station? It\'s not within the school premises so I\'m not sure the school can do anything about this T-T How can we make that area more safe?',
            space: 'dlsu',
            user: '@Careful-Jellyfish-479'
        },
        {title: 'My adopted cat! Help us name our kitten :) 🤍🤍', content: '', space: 'cats', user: '@Artistic-Soul-56'},
        {
            title: 'In your opinion, who is the worst 5 cost unit ever in TFT?',
            content: 'For me I think it’s Volibear from set 5',
            space: 'Teamfight Tactics',
            user: '@Historical-Tree-5688'
        },
        {
            title: 'The Best Coffee Spots in Manila',
            content: 'Share your favorite coffee shops and hidden gems for a caffeine fix in the city!',
            space: 'manila',
            user: '@CozyBlanket'
        },
        {
            title: 'TravelingTips for Beginners',
            content: 'New to traveling? Here are some tips and tricks to make your first trip unforgettable!',
            space: 'travel',
            user: '@GamerGirl23'
        }
    ];

// Define sample comments with associated postIds
    const comments = [
        {
            user: '@Careful-Jellyfish-479',
            content: 'this is one of the reasons why i hate passing by the sb near razons :((( nakakatakot na ewan kasi u dont know what they’re gon do',
            postId: 'postObjectId'
        },
        {
            user: '@Artistic-Soul-56',
            content: 'Need mo picturan yung kumagat sayo then mag pa anti rabies shot ka na',
            postId: 'postObjectId'
        },
        {
            user: '@Historical-Tree-5688',
            content: 'i live in green and i always go there too! anlala nga nung batang kalye diyan nag dribble dribble kahit walang bola sa harap ko tapos tinawanan lang ako nung di ako makadaan 😭👺',
            postId: 'postObjectId'
        },
        {
            user: '@CozyBlanket',
            content: 'I love going to the coffee shops in Manila!',
            postId: 'postObjectId'
        },
        {
            user: '@GamerGirl23',
            content: 'I just started playing TFT and I’m really enjoying it! I’m still learning the ropes, but I’m having a lot of fun.',
            postId: 'postObjectId'
        }
    ];

// Insert sample data into MongoDB
    async function seedDatabase() {
        try {
            await User.deleteMany(); // Clear existing users
            await Post.deleteMany(); // Clear existing posts
            await Comment.deleteMany(); // Clear existing comments

            const createdUsers = await User.create(users); // Insert sample users
            const createdPosts = await Post.create(posts); // Insert sample posts
            const createdComments = await Comment.create(comments); // Insert sample comments

            console.log('Sample data seeded successfully:', createdUsers, createdPosts, createdComments);
        } catch (error) {
            console.error('Error seeding database:', error);
        } finally {
            // Close the MongoDB connection after seeding
            mongoose.connection.close();
        }
    }

    seedDatabase(); });