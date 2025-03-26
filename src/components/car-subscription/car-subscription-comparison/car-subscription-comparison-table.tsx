import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionComparisonTable = async () => {
	const { comparisonTable } = await getCachedGlobal(
		'car-subscription-content',
	)();

	return (
		<table className="mx-auto border text-white">
			<thead>
				<tr>
					{comparisonTable.categories.map(({ id, category }) => (
						<th
							key={id}
							className="border border-neutral-500 bg-white/5 py-2 text-lg"
						>
							{category}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{comparisonTable.contents.map(({ id, parameter, content }) => (
					<tr key={id}>
						<td className="border border-neutral-500 p-1.5">{parameter}</td>
						{content.map(({ id, item }) => (
							<td key={id} className="border border-neutral-500 p-1.5">
								{item}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
