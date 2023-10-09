import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <>
                {activity.author ? (
                  <Link
                    key={activity._id}
                    href={`/thread/${activity.parentId}`}
                  >
                    <article className="activity-card">
                      <Link
                        key={activity._id}
                        href={`/profile/${activity.user._id}`}
                      >
                        <Image
                          src={activity.author.image}
                          alt="user_logo"
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      </Link>
                      <p className="!text-small-regular text-light-1">
                        <Link
                          key={activity._id}
                          href={`/profile/${activity.user._id}`}
                        >
                          <span className="mr-1 text-primary-500">
                            {activity.author.name}
                          </span>{" "}
                        </Link>
                        replied to your thread
                      </p>
                    </article>
                  </Link>
                ) : (
                  <Link
                    key={activity._id}
                    href={`/thread/${activity.thread._id}`}
                  >
                    <article className="activity-card">
                      <Link
                        key={activity._id}
                        href={`/profile/${activity.user._id}`}
                      >
                        <Image
                          src={activity.user.image}
                          alt="user_logo"
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      </Link>
                      <p className="!text-small-regular text-light-1">
                        <Link
                          key={activity._id}
                          href={`/profile/${activity.user._id}`}
                        >
                          <span className="mr-1 text-primary-500">
                            {activity.user.name}
                          </span>{" "}
                        </Link>
                        liked to your thread
                      </p>
                    </article>
                  </Link>
                )}
              </>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;
