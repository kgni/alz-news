import InfoPageLayout from '../../components/UI/Layout/InfoPageLayout';
import TopicCard from '../../components/TopicCard';
import Head from 'next/head';
export default function Page() {
	return (
		<>
			<Head>
				<title>Alzheimers - Treatments</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<article className="leading-relaxed text-md">
				<div className="mb-16">
					<h1 className="text-center text-5xl font-bold leading-normal md:text-4xl md:mb-2">
						Treatments
					</h1>
					<span className="block italic text-center ">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/treatments"
						>
							alz.org
						</a>
					</span>
				</div>
				<p className="mb-12 text-lg">
					There's no cure for Alzheimer’s, but there are treatments that may
					change disease progression, and drug and non-drug options that may
					help treat symptoms. Understanding available options can help
					individuals living with the disease and their caregivers to cope with
					symptoms and improve quality of life.
				</p>
				<div className="bg-black bg-opacity-20 w-full h-[2px] mb-12"></div>

				<section className="">
					<h2 className="text-center text-4xl font-bold mb-8 md:text-2xl">
						Select a Topic
					</h2>
					<div className="grid grid-cols-3 gap-6 auto-rows-[1fr] xl:gap-4 xl:grid-cols-2 sm:grid-cols-1 sm:gap-8">
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/aducanumab"
							img="/img/treatments/compressed/aducanumab.jpg"
							title="Aducanumab Approved for Treatment of Alzheimer’s Disease"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/cms-medicare-coverage"
							img="/img/treatments/compressed/CMS.jpg"
							title="CMS Decision on Treatment Coverage: What It Means for People Living with Alzheimer's"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/medications-for-memory"
							img="/img/treatments/compressed/medication.jpg"
							title="Medications for Memory, Cognition and Dementia-Related Behaviors"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/treatments-for-behavior"
							img="/img/treatments/compressed/behavior.jpg"
							title="Treatments for Behavior"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/for-sleep-changes"
							img="/img/treatments/sleep.jpg"
							title="Treatments for Sleep Changes"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/alternative-treatments"
							img="/img/treatments/compressed/alternative-treatments.jpg"
							title="Alternative Treatments"
						/>
						<TopicCard
							link="https://www.alz.org/alzheimers-dementia/treatments/questions-for-your-doctor"
							img="/img/treatments/compressed/questions-doctor.jpg"
							title="Questions for Your Doctor"
						/>
					</div>
				</section>
			</article>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return (
		<InfoPageLayout containerWidth="w-[80%] xl:w-[90%] lg:w-full">
			{page}
		</InfoPageLayout>
	);
};
