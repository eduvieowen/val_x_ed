// AnniversaryPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import './Anniversary.scss';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from "../../client";
import { Login, dispFireworks } from '../../components';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { audio } from '../../constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const date = ['uploading pictures...'];

// to select between music 1 and music 2 randomly
let randomMusic = null;

const values = [1, 2];
const randomIndex = Math.floor(Math.random() * values.length);
const randomValue = values[randomIndex];

if (randomValue === 1) {
    randomMusic = audio.music1;
}
if (randomValue === 2) {
    randomMusic = audio.music2;
}

const AnniversaryPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayDiv, setDisplayDiv] = useState(false);

    // media useStates
    const [photos, setPhotos] = useState([]);
    const [anvpics, setAnvpics] = useState([]);
    const [isMutedGif, setIsMutedGif] = useState(true);
    const [isMutedMusic, setIsMutedMusic] = useState(false);
    const [isMutedVideo, setIsMutedVideo] = useState(true);
    const [mediaButton, setMediaButton] = useState('🔊 Music/ 🔇 Video');

    // media functions
    const handleMediaButton = () => {
        if (isMutedMusic && !isMutedVideo) {
            setMediaButton('🔊 Music/ 🔇 Video');
        } else if (!isMutedMusic && isMutedVideo) {
            setMediaButton('🔇 Music/ 🔊 Video');
        } else {
            return console.log('Error with media button');
        };
    };
    const handleMedia = () => {
        if (isMutedMusic && isMutedVideo) {
            setIsMutedMusic(false);
            // setIsMutedVideo(true);
            setIsMutedGif(true);
            handleMediaButton();
        } else {
            setIsMutedMusic(!isMutedMusic);
            // setIsMutedVideo(!isMutedVideo);
            setIsMutedGif(!isMutedVideo);
            handleMediaButton();
        };
    };
    const handleMute = () => {
        setIsMutedMusic(true);
        // setIsMutedVideo(true);
        setIsMutedGif(true);
        setMediaButton('🔇 Music/ 🔇 Video');
    };

    // anv pics
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClick = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const query = '*[_type == "anvpics"] | order(name asc)';

        client.fetch(query).then((data) => {
            setAnvpics(data);
        });
        // Login
        setDisplayDiv(isLoggedIn);

        if (isLoggedIn) {
            dispFireworks();
        }
    }, [isLoggedIn]);

    const pic = anvpics[currentIndex];


    const handleLogin = (password) => {
        setIsLoggedIn(true);
    };
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }
    return (
        <div>
            {displayDiv && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="anniversary-page"
                >
                    <audio src={randomMusic} autoPlay loop muted={isMutedMusic} />
                    <audio src={audio.gifAudio} autoPlay loop muted={isMutedGif} />

                    {/* <header>
                        <h1>🎉Happy 1 Year Anniversary!🎉</h1>
                    </header> */}

                    <header>
                        <button
                            className='music-video-button'
                            onClick={() => handleMedia()}
                        >
                            {mediaButton}
                        </button>
                        <button
                            className='mute-all-button'
                            onClick={() => handleMute()}
                        >
                            Mute All
                        </button>
                        <h1>🎉 Happy 1 Year Anniversary! 🎉</h1>
                    </header>

                    <section style={{ marginTop: '5rem' }} className="experience-section">

                        <h2>Our Beautiful Journey</h2>
                        <p>
                            <b>Dear Princess</b>,<br /><br />

                            <p style={{ textAlign: 'center' }} >💐 As we celebrate our one-year anniversary, I find myself filled with a whirlwind of emotions and memories. This past year has been nothing short of extraordinary, and I want to take this moment to express just how much you mean to me 💐.</p><br /><br />

                            From our first encounter, I knew there was something special about you. I was taken away by your beauty, your smile, your laugh, your tone, the way you walk. Months passed and we finally got to meet once more in a more personal setting, I knew I had to make you mine! After months of talking on the phone I was once again swept off my feet by your presence. The way you look at me with those beautiful eyes captivated me in ways I never thought possible. Our journey together since then has been filled with moments of joy, laughter, struggles but most especially,<br /><br />

                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Love.</p>
                            <br />

                            I love you deeply, Princess. Deeper than the layers of this big blue Earth we live in, brighter than its core ❤️‍🔥. My love burns brighter than the Suns scattered across every galaxy combined. <br />
                            I still remember the first time we kissed. Holding you close, feeling your soft lips against mine, it was as if the world melted away and there was nothing but you and me. I yearn to relive that perfect moment <i> over and over and over and over </i> again. It’s a memory I cherish deeply. You have a way of making even the simplest displays of love feel very special. <br /><br />

                            We’ve shared so many experiences together.<br /> From our late-night talks to our movie dates. Our <b><i>steamy</i></b> conversations 🫦. I love how you would lean on me, feeling the warmth of your body against mine. It feels so natural, so right. You are my peace, my comfort, and my joy. Soon we will revisit times like these and create even more!<br /> <br />

                            I’ve learned so much from you, Princess, from understanding how to be a better man to the way you like your nails painted. You've taught me about
                            <br />
                            <p style={{ textAlign: 'center' }}>
                                your interests, your emotional needs, your cravings, the beauty products you prefer, the places you like to visit, the music you like listening to, the books you like to read, the type of TikTok content you like to watch, the way you like to dress, the movies/series you like to watch, what you need to survive the day, how to be more loving, more caring, how to listen actively, how to embody my role as a partner in both speech and action...
                            </p>
                            <br />
                            Every detail, every quirk, every laugh we share makes me fall deeper in love with you. You’ve taught me patience, understanding, and the <b><i>true</i></b> meaning of love. You’ve been my rock and my confidante. <br /> <br />

                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                🤞🏾You are my best friend🤞🏾
                            </p>
                            <br />

                            Talking about <b>steamy conversations</b>... Our intimate moments are something I treasure beyond words, Princess. The way you touch me, your hands on my abs 😮‍💨, inching closer to my chest, it drives me crazyyy. Your gentle yet passionate nature turns me on in ways I never knew were possible. You have the perfect balance of gentle and risqué (oulala), it excites me beyond measure. I need you badly, every day, no, every SECOND away from you feels like fighting a war I'd rather lose just to be with you once more. <br /> <br />

                            I love how we can be ourselves around each other, how we can talk about anything and everything. Your honesty, your openness, even on my worst days I want nothing but to find peace in your presence, all of these things make me realize how grateful I am to have you in my life.
                            <br /> <br />
                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                You are my everything, 👑 Princess
                            </p>
                            <br /> <br />

                            As we look back on this past year, I want you to know that I am so grateful for every moment we’ve shared. I'm blessed to have you in my life. Babe, sometimes I catch myself thinking "What have I done to be blessed with a soulmate this early in my life?" How on God's green Earth did we even come to be?? I have never loved anyone this much before. Even in the face of the uncertainties this life has to offer, I am always sure of one truth:
                            <br />
                            <p>
                                <i>
                                    ~ my love for you will remain steadfast and unwavering, guiding me through every challenge and triumph we encounter together ~
                                </i>
                            </p>
                            <br />
                            You’ve made me a better person, and I simply can not imagine my life without you. I look forward to many more years of love, laughter, and adventure with you right next to me. I look forward to meeting you again SOON. AMEN. I pray to always be by your side, through thick and thin, through the unfavorable times we'll have and through the plethora of even better times we'll have. AMENNN. I pray Jehovah blesses what we have, I pray he nourishes this relationship to watch it grow larger than ever. I've never been more certain about anyone or anything. You, Valerie Ajaifia, my Princess, Queen of my World, are the one for me. I yearn for your affection, I dream of your touch, I anticipate the tone of your voice, and I am consumed by the desire to be near you, to share every moment and every breath with you.<br /> <br />

                            Here’s to us, to our love, and to the beautiful future that lies ahead. I love you more than words can express, and I am so excited for what the next year will bring.<br /><br />

                            Happy 1 year anniversary, my Heart!<br /><br />

                            Forever yours, <br /> <br />
                            Ov 💗
                        </p>

                    </section>

                    {/* <section className="gallery-section">
                        <h2>Our Memorable Moments</h2>

                        {date.length && (

                            <>
                                <div className='app__anniversary-item app__flex'>

                                    <div className='app__anniversary-content'>
                                        <p className='p-text'>{date[currentIndex]}</p>
                                        <div>
                                            <h4 className='bold-text' style={{ textAlign: 'center' }}>{pic?.name}</h4>
                                            <Button onClick={handleOpen}>Open Me 🧸</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-description">
                                                        <div className='app__anniversary-pics app__flex'>

                                                            <motion.div
                                                                whileInView={{ opacity: [0, 1] }}
                                                                transition={{ duration: 0.5, type: 'tween' }}
                                                            >
                                                                <img src={urlFor(pic?.imgUrl)} alt={pic?.name} />
                                                            </motion.div>

                                                        </div>
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </div>
                                    </div>

                                </div>

                                <div className='app__anniversary-btns app__flex'>
                                    <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? date.length - 1 : currentIndex - 1)}>
                                        <HiChevronLeft />
                                    </div>

                                    <div className='app__flex' onClick={() => handleClick(currentIndex === date.length - 1 ? 0 : currentIndex + 1)}>
                                        <HiChevronRight />
                                    </div>
                                </div>
                            </>

                        )}
                    </section> */}

                    <section className="gallery-section">
                        <h2>Our Memorable Moments</h2>

                        {anvpics.length > 0 && (
                            <>
                                <div className='app__anniversary-item app__flex'>

                                    <div className='app__anniversary-content'>

                                        <h4 className='bold-text'>{pic?.name}</h4>
                                        <div className='app__anniversary-btns'>
                                            <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? anvpics.length - 1 : currentIndex - 1)}>
                                                <HiChevronLeft />
                                            </div>

                                            <div className='app__flex' onClick={() => handleClick(currentIndex === anvpics.length - 1 ? 0 : currentIndex + 1)}>
                                                <HiChevronRight />
                                            </div>
                                        </div>
                                        <div className='app__anniversary-pics app__flex'>
                                            <motion.div
                                                whileInView={{ opacity: [0, 1] }}
                                                transition={{ duration: 0.5, type: 'tween' }}
                                            >
                                                <img src={urlFor(pic?.imgUrl)} alt={pic?.name} />
                                            </motion.div>
                                        </div>

                                    </div>

                                </div>


                            </>
                        )}
                    </section>

                    <section className="interactive-section">
                        <h2>Let's Create More Memories!</h2>
                        <p>
                            <i>
                                As I pen these final words, I want you to feel the depth of my love and the heat of my desire for you.
                                <br /> <br />
                                This past year with you has been a whirlwind of emotions, and my love for you has only grown stronger with each passing day. You are not just my love, but my deepest desire, my wildest fantasy.
                            </i>
                        </p>
                    </section>

                    <footer>
                        <p>With all my love,</p>
                        <p>~ Ov xxox</p>
                    </footer>

                </motion.div>
            )}
        </div>
    );
};

export default AppWrap(
    MotionWrap(AnniversaryPage, 'anniversary-page'),
    'valxed'
)
