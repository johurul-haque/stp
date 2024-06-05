import johurulImg from '@/assets/johurul_haque.jpg';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <main className="container pb-20">
      <h1 className="text-2xl font-semibold underline decoration-wavy decoration-green-600 text-center mb-10 mt-4">
        About Us
      </h1>

      <div className="space-y-8 max-w-[65ch] mx-auto [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_p]:font-light">
        <section>
          <h2>Our Mission</h2>
          <p>
            At Travel Buddy, our mission is to connect travelers from around the
            world, fostering a community where adventurers can find like-minded
            companions to share their journeys with. We believe that travel is
            more enriching and enjoyable when experienced with others, and our
            platform is dedicated to making travel safer, more social, and full
            of unforgettable memories.
          </p>
        </section>

        <section>
          <h2>Who We Are</h2>
          <p>
            STP was founded by johurul who does not understand the challenges
            and joys of exploring new destinations. So he is dedicated to
            providing a platform where travelers can find companions, share
            experiences, and make new friends.
          </p>
        </section>

        <section>
          <h2>What We Offer</h2>
          <p>
            Our platform offers a variety of features designed to connect
            travelers:
          </p>
          <ul className="mt-2 space-y-1.5 list-disc [&>li]:ml-4">
            <li>
              Trip Sharing: Post your travel plans and find others who want to
              join.
            </li>
            <li>
              Search and Discover: Easily search for trips by destination, date,
              and type of travel.
            </li>
            <li>
              {' '}
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
            enthusiasm for traveling, tech expert, and community builders who is
            dedicated to enhancing your travel experience. I work very lazy but
            still I get the job done to ensure that everything is user-friendly,
            reliable.
          </p>

          <figure className="max-w-xs mt-4">
            <Image
              width={800}
              height={800}
              src={johurulImg}
              alt="Picture of Johurul Haque"
            />
            <figcaption className="mt-2 font-mono">
              The guy, the myth 😎
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

          <dl className="text-sm font-light mt-6 space-y-2">
            <div className="flex gap-x-4">
              <dt>Email</dt>
              <dd>
                <a
                  href="mailto:johurulhaquejony@gmail.com"
                  className="hover:underline"
                >
                  johurulhaquejony@gmail.com
                </a>
              </dd>
            </div>

            <div className="flex gap-x-4">
              <dt>Social handle</dt>
              <dd>
                <a
                  href="https://github.com/johurul-haque"
                  className="hover:underline"
                >
                  johurul-haque
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
