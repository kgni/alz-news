import React from 'react';

const About = () => {
	return (
		<div className="flex items-center justify-between gap-44">
			<img className="w-1/2" src="/img/synapse-brain.png" alt="" />
			<div className="w-1/2">
				<h2 className="text-6xl font-semibold mb-12 ">What Is Alz.news?</h2>
				<div className="leading-loose flex flex-col gap-4 w-">
					<p>
						Alz.news is a simple, <em className="font-bold">easy-to-use</em>,
						non-profit platform for anyone who has an interest in Alzheimer's or
						Dementia. <br />
						The purpose is to make resources including articles, journals,
						practical information and all kinds of knowledge, easily accessible
						by gathering it all in one place.
					</p>
					<p>
						Alz.news is not affiliated with any Alzheimer's organizations or
						patients advocacy groups in any way.
					</p>
					<p>
						If you have any relevant information or suggestions for content or
						improvements, <br /> please contact us at{' '}
						<address className="inline font-bold">info@alz.news</address>
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
