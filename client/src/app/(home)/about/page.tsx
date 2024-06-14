import johurulImg from "@/assets/johurul_haque.jpg";
import { atma, manrope } from "@/lib/fonts";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className={`container pb-20 ${manrope.className}`}>
      <h1
        className={`text-4xl font-bold text-center mb-10 mt-14 ${atma.className}`}
      >
        About{" "}
        <abbr title="Social Travel Platform" className="no-underline">
          STP
        </abbr>
      </h1>

      <div className="space-y-8 max-w-[65ch] mx-auto [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_p]:tracking-wide [&_p]:leading-6">
        <section>
          <h2>Our Mission</h2>
          <p>
            At <abbr title="Social Travel Platform">STP</abbr>, our mission is
            to connect travelers from around the world, fostering a community
            where adventurers can find like-minded companions to share their
            journeys with. We believe that travel is more enriching and
            enjoyable when experienced with others, and our platform is
            dedicated to making travel safer, more social, and full of
            unforgettable memories.
          </p>
        </section>

        <section>
          <h2>Who We Are</h2>
          <p>
            <abbr title="Social Travel Platform">STP</abbr> was founded by
            johurul who does not understand the challenges and joys of exploring
            new destinations. So he is dedicated to providing a platform where
            travelers can find companions, share experiences, and make new
            friends.
          </p>
        </section>

        <section>
          <h2>What We Offer</h2>
          <p>
            Our platform offers a variety of features designed to connect
            travelers:
          </p>
          <ul className="mt-2 space-y-1.5 list-disc [&>li]:ml-4 marker:text-neutral-700/90">
            <li>
              Trip Sharing: Post your travel plans and find others who want to
              join.
            </li>
            <li>
              Search and Discover: Easily search for trips by destination, date,
              and type of travel.
            </li>
            <li>
              {" "}
              Community Engagement: Connect with fellow travelers, share tips,
              and find travel advice.
            </li>
            <li>
              Safety and Security: We prioritize the safety of our users with
              secure login systems and privacy controls.
            </li>
          </ul>
        </section>

        <section>
          <h2>Meet the Team</h2>
          <p>
            The team is composed of a <strong>one-man army.</strong> A guy with
            no enthusiasm for traveling, a tech expert, and definitely not a
            community builder. Who is dedicated to enhancing your travel
            experience. {"He's"} lazy, yet still gets the job done and ensures
            everything is user-friendly, and reliable.
          </p>

          <figure className="max-w-[15rem] mt-8">
            <Image
              width={800}
              height={800}
              src={johurulImg}
              alt="Picture of Johurul Haque"
              className="rounded-full"
            />
            <figcaption className="mt-4 text-center">
              <dl>
                <dt className="uppercase font-semibold tracking-wide text-xs opacity-70">
                  Software Developer
                </dt>
                <dd
                  className={`text-lg font-semibold tracking-wide opacity-80 ${atma.className}`}
                >
                  Johurul Haque
                </dd>
              </dl>
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            We love hearing from our users! Whether you have a question, need
            support, or just want to share your travel stories, feel free to
            reach out to us.
          </p>

          <dl className="text-sm [&_dd]:font-light mt-4 space-y-2">
            <div className="flex gap-x-4">
              <dt>Email</dt>
              <dd>
                <a
                  href="mailto:johurulhaquejony@gmail.com"
                  className="underline"
                >
                  johurulhaquejony@gmail.com
                </a>
              </dd>
            </div>

            <div className="flex gap-x-4">
              <dt>Social</dt>
              <dd className="space-x-3">
                <a
                  href="https://github.com/johurul-haque"
                  className="underline"
                >
                  Github
                </a>

                <a
                  href="https://linkedin.com/in/johurul-haque/"
                  className="underline"
                >
                  Linkedin
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
