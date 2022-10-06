import InfoPageLayout from '../../components/UI/Layout/InfoPageLayout';
import Head from 'next/head';
import CountDownBox from '../../components/CountDownBox';
export default function Page({}) {
	return (
		<>
			<Head>
				<title>Alzheimers - Know the 10 Signs</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<article className="leading-relaxed text-lg">
				<div className="mb-16">
					<h1 className="text-center text-5xl font-bold leading-normal">
						10 Early Signs and Symptoms of Alzheimer's
					</h1>
					<span className="block italic text-center">
						Source:{' '}
						<a
							className="underline hover:text-gray-500 "
							target="_blank"
							href="https://www.alz.org/alzheimers-dementia/10_signs"
						>
							alz.org
						</a>
					</span>
				</div>
				<p className="mb-24">
					Memory loss that disrupts daily life may be a symptom of Alzheimer's
					or other dementia. Alzheimer's is a brain disease that causes a slow
					decline in memory, thinking and reasoning skills. There are 10 warning
					signs and symptoms. If you notice any of them, don't ignore them.
					Schedule an appointment with your doctor.
				</p>
				<section className="mb-24">
					<CountDownBox
						number={1}
						title="Memory loss that disrupts daily life"
					/>
					<p
						className="mb-6
				"
					>
						One of the most common signs of Alzheimer’s disease, especially in
						the early stage, is forgetting recently learned information. Others
						include forgetting important dates or events, asking the same
						questions over and over, and increasingly needing to rely on memory
						aids (e.g., reminder notes or electronic devices) or family members
						for things they used to handle on their own.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Sometimes forgetting names or appointments, but remembering them
						later.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={2}
						title="Challenges in planning or solving problems"
					/>
					<p
						className="mb-6
				"
					>
						Some people living with dementia may experience changes in their
						ability to develop and follow a plan or work with numbers. They may
						have trouble following a familiar recipe or keeping track of monthly
						bills. They may have difficulty concentrating and take much longer
						to do things than they did before.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Making occasional errors when managing finances or household bills.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={3}
						title="Difficulty completing familiar tasks"
					/>
					<p
						className="mb-6
				"
					>
						People with Alzheimer's often find it hard to complete daily tasks.
						Sometimes they may have trouble driving to a familiar location,
						organizing a grocery list or remembering the rules of a favorite
						game.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Occasionally needing help to use microwave settings or to record a
						TV show.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox number={4} title="Confusion with time or place" />
					<p
						className="mb-6
				"
					>
						People living with Alzheimer's can lose track of dates, seasons and
						the passage of time. They may have trouble understanding something
						if it is not happening immediately. Sometimes they may forget where
						they are or how they got there.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Getting confused about the day of the week but figuring it out
						later.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={5}
						title="Trouble understanding visual images and spatial relationships"
					/>
					<p
						className="mb-6
				"
					>
						For some people, having vision problems is a sign of Alzheimer's.
						This may lead to difficulty with balance or trouble reading. They
						may also have problems judging distance and determining color or
						contrast, causing issues with driving.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Vision changes related to cataracts.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={6}
						title="New problems with words in speaking or writing"
					/>
					<p
						className="mb-6
				"
					>
						People living with Alzheimer's may have trouble following or joining
						a conversation. They may stop in the middle of a conversation and
						have no idea how to continue or they may repeat themselves. They may
						struggle with vocabulary, have trouble naming a familiar object or
						use the wrong name (e.g., calling a "watch" a "hand-clock").
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Sometimes having trouble finding the right word.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={7}
						title="Misplacing things and losing the ability to retrace steps"
					/>
					<p
						className="mb-6
				"
					>
						A person living with Alzheimer's disease may put things in unusual
						places. They may lose things and be unable to go back over their
						steps to find them again. He or she may accuse others of stealing,
						especially as the disease progresses.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Misplacing things from time to time and retracing steps to find
						them.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox number={8} title="Decreased or poor judgment" />
					<p
						className="mb-6
				"
					>
						Individuals may experience changes in judgment or decision-making.
						For example, they may use poor judgment when dealing with money or
						pay less attention to grooming or keeping themselves clean.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Making a bad decision or mistake once in a while, like neglecting to
						change the oil in the car.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={9}
						title="Withdrawal from work or social activities
"
					/>
					<p
						className="mb-6
				"
					>
						A person living with Alzheimer’s disease may experience changes in
						the ability to hold or follow a conversation. As a result, he or she
						may withdraw from hobbies, social activities or other engagements.
						They may have trouble keeping up with a favorite team or activity.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Sometimes feeling uninterested in family or social obligations.
					</p>
				</section>
				<section className="mb-24">
					<CountDownBox
						number={10}
						title="Changes in mood and personality
"
					/>
					<p
						className="mb-6
				"
					>
						Individuals living with Alzheimer’s may experience mood and
						personality changes. They can become confused, suspicious,
						depressed, fearful or anxious. They may be easily upset at home,
						with friends or when out of their comfort zone.
					</p>
					<p className="mb-6">
						<strong className="block">
							What's a typical age-related change?
						</strong>
						Developing very specific ways of doing things and becoming irritable
						when a routine is disrupted.
					</p>
				</section>
				<section className="mb-24">
					<h2 className="text-3xl font-bold mb-6">
						What is the difference between Alzheimer’s and typical age-related
						changes?
					</h2>
					<div className="grid grid-cols-2">
						<div className="border-r-[1px] border-white">
							<h3 className="text-center py-4 bg-black text-white font-bold">
								Signs of Alzheimer's and Dementia
							</h3>
							<ul className="flex flex-col">
								<li className="py-4 px-4">Poor judgment and decision-making</li>
								<li className="py-4 px-4 bg-gray-200">
									Inability to manage a budget
								</li>
								<li className="py-4 px-4">
									Losing track of the date or the season
								</li>
								<li className="py-4 px-4 bg-gray-200">
									Difficulty having a conversation
								</li>
								<li className="pt-4 px-4">
									Misplacing things and being unable to retrace steps to find
									them
								</li>
							</ul>
						</div>
						<div className="border-l-[1px] border-white">
							<h3 className="text-center py-4 bg-black text-white font-bold">
								Typical Age-Related Changes
							</h3>
							<ul className="flex flex-col">
								<li className="py-4 pl-4 ">
									Making a bad decision once in a while
								</li>
								<li className="py-4 pl-4 bg-gray-200">
									Missing a monthly payment
								</li>
								<li className="py-4 pl-4 ">
									Forgetting which day it is and remembering it later
								</li>
								<li className="py-4 pl-4 bg-gray-200">
									Sometimes forgetting which word to use
								</li>
								<li className="pt-4 pl-4">Losing things from time to time</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="">
					<h2 className="text-3xl font-bold mb-6">
						What to do if you notice these signs?
					</h2>
					<p
						className="mb-6
				"
					>
						If you notice any of the 10 Warning Signs of Alzheimer's in yourself
						or someone you know, don't ignore them. Schedule an appointment with
						your doctor.
					</p>
					<p
						className="mb-6
				"
					>
						With early detection, you can explore treatments that may provide
						some relief of symptoms and help you maintain a level of
						independence longer, as well as increase your chances of
						participating in clinical drug trials that help advance research.
					</p>
				</section>
				<span className="block italic">
					Source:{' '}
					<a
						className="underline hover:text-gray-500 "
						target="_blank"
						href="https://www.alz.org/alzheimers-dementia/10_signs"
					>
						alz.org
					</a>
				</span>
			</article>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return <InfoPageLayout>{page}</InfoPageLayout>;
};
