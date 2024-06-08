import { manrope } from '@/lib/fonts';
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Logo } from './header/logo';

export function Footer() {
  return (
    <footer
      className={`border-t dark:border-opacity-40 mt-16 ${manrope.className}`}
    >
      <div className="container py-12">
        <div className="grid gap-y-6 gap-x-4 xs:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo
              className={{
                wrapper: 'text-4xl max-md:text-3xl gap-2.5',
                logo: 'size-10',
              }}
            />
            <p className="mt-4 font-medium max-w-xs">
              Social Travel Platform for finding travel companions by sharing
              and exploring trip plans.
            </p>
          </div>

          <section>
            <h3 className="mb-3 font-semibold">Company</h3>
            <address className="text-sm">
              123 Main Street <br />
              Nowhere, USA 12345
            </address>

            <dl className="mt-2 space-y-2 text-sm">
              <dt className="sr-only">Email</dt>
              <dd className="flex items-center gap-1.5">
                <MailIcon
                  size={18}
                  strokeWidth={1.5}
                  opacity={0.8}
                  className="shrink-0"
                />
                <a
                  href="mailto:johurulhaquejony@gmail.com"
                  className="hover:underline"
                >
                  contact@stp.com
                </a>
              </dd>

              <dt className="sr-only">Mobile Number</dt>
              <dd className="flex items-center gap-1.5">
                <PhoneIcon
                  size={18}
                  strokeWidth={1.5}
                  opacity={0.8}
                  className="shrink-0"
                />
                <a href="tel:+01705307467" className="hover:underline">
                  +880 1712-345678
                </a>
              </dd>
            </dl>
          </section>

          <section>
            <h3 className="mb-3 font-semibold">Help</h3>
            <ul className="space-y-3 text-sm">
              {[
                'Customer Support',
                'Delivery Details',
                'Terms & Conditions',
                'Privacy Policy',
              ].map((value) => (
                <li
                  key={value}
                  className="hover:underline cursor-pointer max-w-fit"
                >
                  {value}
                </li>
              ))}{' '}
            </ul>
          </section>
        </div>

        <div className="pt-6 flex justify-between mt-1">
          <p className="text-sm font-light">
            &copy; 2024 <abbr title="Social Travel Platform">STP</abbr>. All
            rights reserved.
          </p>

          <dl className="flex gap-x-6">
            <dt className="sr-only">Github Account</dt>
            <dd>
              <a
                href="http://github.com/johurul-haque"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">View github account</span>
                <GithubIcon
                  strokeWidth={1.7}
                  size={18}
                  className="opacity-90"
                />
              </a>
            </dd>

            <dt className="sr-only">LinkedIn</dt>
            <dd>
              <a
                href="http://linkedin.com/in/johurul-haque"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">View linkedin account</span>
                <LinkedinIcon
                  strokeWidth={1.7}
                  size={18}
                  className="opacity-90"
                />
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </footer>
  );
}
