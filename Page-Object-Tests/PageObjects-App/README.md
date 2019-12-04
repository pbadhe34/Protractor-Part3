## A word on testing

Before we get into the actual rules and best practices themselves, I would like to take a moment to talk about testing in
general, what it means and why it is so important in the development process of an application.

If I look back at how I started with testing, I can remember very well that the beginning was anything but easy. At that
time, I had a vague idea that it 'must be a good thing', but I didn't fully understand what it was all about. Everything
seemed overly complicated, time consuming and just a big overhead all in all. This is a sentiment that I have heard many
times from a lot of developers that start with testing, and it is also something that pushes many of them away from writing
automated tests.

My **AHA!** moment was during the first major refactoring of our codebase, when I understood the true power of having
automated tests. It was from that moment on that I stopped looking at writing tests as a chore but rather as something
that is equally important as writing the application code itself.

Since then I have done a lot of reading about it and come to realise that testing is a whole world in itself, with its
own discourse, theory and practices. And just like any other thing that we developers want to master, it takes time and
reading and practice. I like to advocate for testing, because I truly believe in its benefits and in what it stands for.
I could not imagine writing code without its accompanying tests anymore, and this is something that I like to encourage
others to do every time I get the chance.

So why is testing so important ultimately?

Well first of all because tests will tell you if your application is working as it should. In my opinion this is the first
and most important benefit of having automated tests. Successful tests will give you the confidence that everything
in your application runs properly. They will give you the confidence that any changes in your codebase, no matter
how small and insignificant they might seem at a first glance, don't break the behavior of your system. And all this at
a very early stage of the development process. Just imagine introducing a set of changes to your codebase and having to
manually test whether those changes didn't break any other parts of the application. Kind of makes you want to go to
the corner and cry, right? This is precisely the point where automating testing becomes so powerful and important to have.

Automated tests also serve as documentation. I have often heard developers new to a project say that, having
read the tests of the project, has helped them get insights of the application much easier and faster. And this is very
true. If written properly, tests will express in clear and understandable terms what the expected behavior of the
application is. This makes it very easy for new contributors to join a project, or why not be honest about it, for you
to remember what that piece of code you wrote ages ago is supposed to do ;).

The last thing I want to mention here is my personal belief and experience that writing tests makes us better developers.
Tests will force us to think twice about what our code really has to do, about corner cases and whether we handle all of
them, they will teach us about our programming soft spots and make us learn from our mistakes. It's kind of like a
"think before you speak" thing, if you will.

I have often seen teams trying to 'cheat' on their tests by writing dummy specs that always complete successfully. I have
a hard time understanding why anyone would go down that path, but the reason I hear most frequently is 'code coverage'.
Now, I don't believe in writing tests just for the sake of reaching some coverage thresholds, that most likely you didn't
have any say in to begin with, no more than I believe that you can have the cookie and eat it too. If you ever find
yourself drifting that path, just remember that cheating on your tests is, at the end of the day, just cheating on yourself.
Tests are there for a reason!

If you venture out into the testing literature, you might be overwhelmed by the many different types of tests authors
refer to. This style guide is all about e2e tests (with Protractor), but because I think it is important to make the
distinction, I want to say a few words about unit testing as well.

#### Unit Testing

Unit tests are the first line of defence against bugs and errors in your code. They ensure that the smallest parts
of an application, the units, work as intended, by testing them in complete isolation from the rest of the application.

Let's take a car as an example. Unit testing a car would be taking each of its parts, like the wheels, or the engine,
separately, and checking whether they work properly, independently from each other.

It is important to remember the "in complete isolation" aspect of unit testing. Instantiating services, making API calls,
or even worse, instantiating the entire system (all very expensive operations), in order to test just one single
unit, is unnecessary and definitely not a good practice. The general rule of thumb is to mock any external dependencies
of the unit under test.

#### E2E Testing

E2E tests are the next common sense step after unit tests, that will allow you to trace bugs and errors in the behavior of
your system. They are a means of testing if all units of an application interact as expected with each other and if
the system as a whole works as intended.

Coming back to our previous car example, e2e testing the car would mean checking if all components of the car integrate well
with each other and have the expected behavior as an overall. For instance you would want to know if the break lights turn
on when the driver hits the break or if the wheels start turning when the driver steps on the acceleration pedal, and so on.

There is a lot of discussion around what parts of an application should or shouldn't be e2e tested and about how a proper
system under test should be set up. Many developers who start with e2e testing are usually confused about what the 'right'
way to do things is. Julie Ralph wrote a very good article about this, that I will link here once it is officially
published, in which she explains very nicely the pros and cons of the options out there.

I for one like to think of e2e testing as testing from the perspective of the end user. Consider an email application for
example. What is the functionality that this application provides to the end user? Can a user view their inbox? Can they
write emails or delete them? Can they save drafts? How does the user interact with the application in order to perform
these actions and what are the expected outcomes of each one of them? These are all questions that e2e tests should answer
by simulating all these user interaction flows and making assertions about their outcomes and about what the user experiences
throughout the process.

## Protractor

If you've been in the Angular world for long enough, you'll probably remember about the [Angular Scenario Runner]
(https://code.angularjs.org/1.2.16/docs/guide/e2e-testing). The Scenario Runner was originally shipped with Angular as a
tool to help developers e2e test their application. However, due to some design and maintenance issues, the team decided
to not continue with its development and provide a better solution on the long term. Currently, the Angular Scenario
Runner is deprecated and in maintenance mode (last time I checked ;)), so in case you are using it in your application,
you might want to reconsider.

The "new" tool for e2e testing your AngularJS applications is Protractor. Protractor is an e2e test framework built on top
of WebDriverJS, that comes with some Angular specific locator strategies on top of those offered by webdriverjs. You can read
all about the project and the API specification at [http://www.protractortest.org](http://www.protractortest.org)


## Page Objects

Let's assume we have a very simple application that can answer any given question. Let's call it the "Grandfather
of All Knowledge" app. The idea of the app is pretty straightforward: the user enters a question in an input field,
presses a button and gets the answer to the question. Easy! ... and clever if you get the right answer ;)

The HTML markup for the application is as follows:

```html
  <!-- grandfather.html -->

  <body ng-app="GrandfatherOfAllKnowledgeApp">
    <div class="question">
      <input class="question__field" ng-model="question.text"
             placeholder="What would you like to ask Grandfather of all knowledge?">
      <button class="question__button" ng-click="answerQuestion()"
              ng-disabled="!question.text">?</button>
    </div>
    <div class="answer">{{answer}}</div>
  </body>
  ```

The e2e tests in this case should cover exactly the interaction we described earlier: user enters question, presses
button and gets an answer. They look something like this:

```javascript
  /* grandfather.spec.js */

  describe("The grandfather of all knowledge", function() {

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          var question = element(by.model('question.text'));
          var answer = element(by.binding('answer'));
          var button = element(by.className('question__button'));

          question.sendKeys("What is the purpose of meaning?");
          button.click();
          expect(answer.getText()).toEqual("Chocolate!");
      });

      it('should not allow empty questions', function() {
          var question = element(by.model('question.text'));
          var answer = element(by.binding('answer'));
          var button = element(by.className('question__button'));

          question.sendKeys("    ");
          expect(button.isEnabled()).toBeFalsy();
      });
  });
```

Now, the fact that we are declaring the question/answer/button elements in each spec, adds a lot of duplicate code to our
tests, and as we all know, duplicate code is generally not a good practice. Let's fix that!

```javascript
  /* grandfather.spec.js */

  describe("The grandfather of all knowledge", function() {

      var question = element(by.model('question.text'));
      var answer = element(by.binding('answer'));
      var button = element(by.className('question__button'));

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          question.sendKeys("What is the purpose of meaning?");
          button.click();
          expect(answer.getText()).toEqual("Chocolate!");
      });

      it('should not allow empty questions', function() {
          question.sendKeys("    ");
          expect(button.isEnabled()).toBeFalsy();
      });
  });
```

This is already better, but we can do even better than that. If you look at the tests we wrote, notice that they are
dealing with multiple concerns at the same time: keeping track of the page under test, selecting elements from that page,
defining the interaction with these elements, making the assertions and so on. Furthermore, imagine that the markup of
the tested page changes, so for instance the class of our button would change from "question__button" to just simply
"button". This means that we would have to revisit all the code in our tests where we declared the button and make
sure the selector is updated to the correct class name. For large code bases, but not only, this is simply not maintainable.

This is precisely the point where **Page Objects** will come to the rescue. Page Object is a design pattern that is largely
used in test automation for enhancing test maintenance and reducing code duplication. Page Objects provide an API to the
page under test and are responsible of abstracting away its implementation details from the tests themselves.

There is one [explanation](https://www.youtube.com/watch?v=oX-0Mt5zju0) of Page Objects by [Simon Stewart](https://twitter.com/shs96c)
that I particularly like and that has helped me a lot in understanding and working with the concept better. It goes like
this:

> I think on Page Objects being like Janus-like objects (Janus is the Roman God with two heads that looks both ways).
> Looking one way, he introspects deeply into the HTML, he knows the page and how everything is hooked together and
> understands how to find a particular element. Looking the other way, he presents the services that the page offers to you.

Coming back to our Grandfather of all Knowledge application, let's see how a Page Object would look like:

```javascript
  /* grandfather.pageObject.js */

  var GrandfatherOfAllKnowledge = function() {
      this.question = element(by.model('question.text'));
      this.answer = element(by.binding('answer'));
      this.button = element(by.className('question__button'));

      this.askQuestion = function(question) {
          this.question.sendKeys(question);
          this.button.click();
      };
  };
  module.exports = GrandfatherOfAllKnowledge;
```

```javascript
  /* grandfather.spec.js */

  var GrandfatherOfAllKnowledge = require('./grandfatherPageObject');

  describe("The grandfather of all knowledge", function() {

      var grandfatherOfAllKnowledge = new GrandfatherOfAllKnowledge();

      beforeEach(function() {
          browser.get('/#/grandfather-of-all-knowledge');
      });

      it('should answer any question', function() {
          grandfatherOfAllKnowledge.askQuestion("What is the purpose of meaning?");
          expect(grandfatherOfAllKnowledge.answer.getText()).toEqual("Chocolate!");
      });

      it('should not allow empty questions', function() {
          grandfatherOfAllKnowledge.askQuestion("    ");
          expect(grandfatherOfAllKnowledge.button.isEnabled()).toBeFalsy();
      });
  });
```

Much cleaner right? Notice how nicely our concerns are separated now and how much more readable the tests have become.
You will of course still have to make sure that your Page Objects are up to date with any changes in the markup they serve,
but since that's all encapsulated in one place, the task is much more manageable.

