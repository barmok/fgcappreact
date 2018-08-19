import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';


import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';
import YouTube from 'react-youtube';

const NextModulePage = () =>
<AuthUserContext.Consumer>
  {authUser =>
    <div>
      <h1 className="hidden">Next module for:  {authUser.email}</h1>
      <div className="mdl-card__supporting-text mdl-color-text--grey-600">

          <h1>Module 1: Introduction</h1>
          <br/>

          <p className="module-text">
          Welcome to the first module of the YourYoni program! We look forward to guiding you over
  the next 9 weeks. <br/>
  You might be thinking that you’re alone in your concerns about your genitals, but it’s a
  surprisingly common issue which usually starts at a young age. Close to one in five adult
  Australian women have considered cosmetic genital surgery and the numbers seem to keep
  rising.<br/>
  There are a number of reasons why we think girls and women started becoming more
  concerned about how their genitals look in recent times. As you may have experienced in
  your own life, we don’t tend to talk about our genitals in an open and honest way like we do
  with other body parts. This means that we tend to be more embarrassed or ashamed of our
  genitals than the rest of our bodies. If you’re feeling a bit embarrassed just reading this, that’s
  completely normal! We plan for you to be feeling better soon.<br/>
  When we’re concerned about our genitals, it can have a really big impact on our lives. We
  might be worried about being intimate with a partner as we’re worried about what they might
  think of our genitals. We may feel like we can’t wear tighter clothes or bathers as someone
  might see the outline of our genitals through our clothes. We might even avoid having routine
  medical investigations as we don’t want a doctor to examine our genitals. We can also
  experience physical discomfort too when exercising or when wearing certain types of
  clothing. If this sounds familiar, that’s OK. We will be assisting you to address and manage
  these concerns over the coming weeks.<br/>
  You might already be aware that female genitalia come in all different shape, sizes, colours
  and textures. Just check out some photos here from the Labia Library.
  We encourage you to take some time looking at these images even though it might be a bit
  confronting at first. You’ll gradually get used to it.<br/>
  <div className="italic">What did you think? Did any of them a bit like your genitals? </div><br/>
  Despite this natural diversity, there seems to be only one type of genital appearance which is
  shown in the media and even medical text books(!) and that is one with a small and
  symmetrical vulva. With this narrow range of appearances, it’s no wonder that people are
  getting worried! In Australia, we have some rather strict guidelines around how nudity can be
  portrayed in publications and this sometimes means that photos of women’s genitals are
  airbrushed without us even knowing it. So, these women may have had more diverse looking
  genitalia, but the airbrushing made them all look the same. For more information about the
  airbrushing of genital images, check out this short ABC video.<br/>
  <div className="italic">Have you ever searched the internet for images of women’s genitals? Maybe you were
  comparing yourself? Was there much diversity? </div><br/>
  This brings us to the end of this week’s module. Thank you for your participation. We hope
  you are feeling less alone in your concerns about your genitals and have a bit more of an
  understanding about how these concerns might develop.<br/>
  Before you go, please complete this short survey and then have a go at the homework
  exercise by going to the button below.  </p>

  Link to the text "Labia Library": <a target="_blank" href="http://www.labialibrary.org.au/photo-gallery/#"> http://www.labialibrary.org.au/photo-gallery/# </a> <br />
Link to the text "ABC video": <a target="_blank" href="https://vimeo.com/10883108"> https://vimeo.com/10883108 </a>


        <br/><br/>
        <YouTube
        videoId={'OOhgwjEnfAA'}                  // defaults -> null
        />
        <br/><br/>
        <Link to={routes.HOMEWORK}><button className="mdl-button mdl-js-button mdl-button--raised" id="startHomework" name="homework">Start Homework Exercice</button> </Link>
        <br/><br/>
        <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <br/><br/>
        <br/><br/>

    </div>
    </div>
  }
  </AuthUserContext.Consumer>

  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(NextModulePage);
