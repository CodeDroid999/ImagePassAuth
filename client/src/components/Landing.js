import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttackBlock from "./Items/AttackBlock";

export default function Home() {
  function handleKnowMore() {
    const element = document.getElementById("home--2");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex-col md:flex-row flex justify-around mt-8 sm:mt-16 font-['Work_Sans']">
        <div className="sm:hidden flex justify-center">
          <img
            alt=""
            className="rounded-[25px] w-[90%]"
            src="https://i.postimg.cc/KvCYRFgs/57a8f5cb7d8b39de2f160e5d530865a9.jpg"
          />
        </div>

        {/*INFO*/}
        <div className="text-white ml-8 mt-8">
          <p className="text-3xl sm:text-6xl font-bold">
            Unlock Your World with Pictures
          </p>
          <p className="text-3xl sm:text-6xl font-bold">
            Your Password, Your Canvas!
          </p>
          <p className="text-3xl sm:text-6xl font-bold">Authentication</p>
          <p className="text-xl sm:text-xl">
            Graphical Password Auth Tool is an innovative and user-friendly
            authentication system designed to enhance security while providing a
            memorable and engaging user experience. Unlike traditional
            text-based passwords, this tool employs a visually appealing
            approach that allows dyslexic users to create and authenticate
            passwords using images, patterns, or shapes.
          </p>
          <button
            onClick={handleKnowMore}
            className="transition duration-500 ease-in-out sm:w-1/3 bg-blue-600 rounded-lg px-4 py-1 mt-6 sm:text-xl border-blue-600 border-2 hover:bg-transparent"
          >
            <FontAwesomeIcon className="text-white mr-3" icon={faUnlock} />
            Learn More
          </button>
        </div>
      </div>
      <div id="home--2" className="bg-blue-500 m-3 sm:mt-48 font-['Work_Sans']">
        <div className="ml-6 sm:ml-28 pt-24">
        <h2 className="text-3xl font-semibold mb-4 text-white">How to Use</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">Step 1: Registration</h3>
            <ul className="list-disc list-inside">
              <li>Visit the Graphical Password Auth Tool website or open the mobile app.</li>
              <li>Click on the "Sign Up" or "Register" button to create a new account.</li>
              <li>Enter your email address and create a strong password as a backup authentication method.</li>
              <li>Choose a memorable image or create a custom pattern as your graphical password.</li>
              <li>Complete the registration process and verify your email to activate your account.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">Step 2: Logging In</h3>
            <ul className="list-disc list-inside">
              <li>Go to the Graphical Password Auth Tool login page or open the app.</li>
              <li>Enter your registered email address.</li>
              <li>Instead of typing a traditional password, you will see a grid or canvas.</li>
              <li>Recreate your graphical password by clicking on specific points or drawing the pattern in the correct sequence.</li>
              <li>If this is your first time logging in on a device, you may be prompted to verify your email or perform additional security steps.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">Step 3: Managing Your Account</h3>
            <ul className="list-disc list-inside">
              <li>To change your graphical password or update your account details, log in and navigate to the "Account Settings" section.</li>
              <li>Select "Change Password" or "Update Details" and follow the instructions provided.</li>
              <li>You can also manage additional security settings like multi-factor authentication (if supported) for added protection.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">Step 4: Password Recovery</h3>
            <ul className="list-disc list-inside">
              <li>In case you forget your graphical password, don't worry! You still have your traditional password as a backup.</li>
              <li>Click on the "Forgot Password" link on the login page.</li>
              <li>Enter your registered email address, and a password reset link will be sent to your inbox.</li>
              <li>Follow the link to reset your traditional password and regain access to your account.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-xl">Step 5: Security Tips</h3>
            <ul className="list-disc list-inside">
              <li>Keep your graphical password confidential and never share it with anyone.</li>
              <li>Avoid using easily recognizable or public images as your graphical password.</li>
              <li>Regularly review your account activity and enable multi-factor authentication if available.</li>
              <li>If you suspect any suspicious login attempts, change your password immediately and notify support.</li>
            </ul>
          </div>
          <p>
            With the Graphical Password Auth Tool, you can experience a secure and enjoyable login process, and you'll never have to worry about forgetting your passwords again!
          </p>
        </div>
        </div>
      </div>
      <div id="home--2" className="sm:mt-48 font-['Work_Sans']">
        <div className="ml-6 sm:ml-28 pt-24">
          <p className="text-white text-3xl sm:text-5xl font-bold">
            Resistance To Attacks
          </p>
          <p className="text-white text-xl sm:text-2xl mt-3">
            Our System Provides Security Against Popular Attacks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-8">
            <AttackBlock
              icon="https://img.icons8.com/ios-filled/100/A259FF/re-enter-pincode.png"
              title="Bruteforce"
              desc="After reaching max tries, the user will be notified via message through email. And the further authentication through the generic URL/website is disabled for that user account, instead, they have to use the link that will be sent by the company in the notification email. This also lets the legitimate user know about the adversary."
            />
            <AttackBlock
              icon="https://img.icons8.com/ios-filled/100/A259FF/show-password.png"
              title="Shoulder Surfing"
              desc="Shoulder surfing is a type of social engineering technique used to obtain information such as personal identification numbers (PINs), passwords and other confidential data by looking over the victim's shoulder. The system we adopt is similar to the Phone pattern system."
            />
            <AttackBlock
              icon="https://img.icons8.com/ios-filled/100/A259FF/spyware-free.png"
              title="Spyware"
              desc="Graphical password systems resist spyware more easily than regular passwords. Key-loggers secretly capture keystrokes and transfer, but if the spyware wants to track the mouse movements, it can be tracked, but the adversary wouldn’t know which part of the mouse event is actually the graphical password."
            />
            <AttackBlock
              icon="https://img.icons8.com/ios-filled/100/A259FF/enter-pin.png"
              title="Phishing"
              desc="Since the adversary is made to believe that the password is a set of images, it’s not possible to make a fake page, since the adversary thinks he doesn’t know the images."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
