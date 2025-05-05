import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterveiwsByUserId,
  getLatestInterviews,
} from '@/lib/actions/general.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  const user = await getCurrentUser();

  // console.log('user', user?.id);
  if (user?.id === undefined) {
    throw new Error('User ID is undefined');
  }

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterveiwsByUserId(user?.id),
    await getLatestInterviews({ userId: user?.id }),
  ]);

  // ! this method is in efficient and makes call one by one but we need to make the call parlelly, so we use promise.all
  // const userInterviews = await getInterveiwsByUserId(user?.id!);
  // const getLatestInterviews = await getLatestInterviews({user?.id!});
  // console.log('userInterviews', userInterviews[0].id);
  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard
                interviewId={interview.id}
                {...interview}
                key={interview.id}
              />
            ))
          ) : (
            <p>You havn&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard
                interviewId={interview.id}
                {...interview}
                key={interview.id}
              />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
