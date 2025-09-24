import { useMemo, useState } from 'react';

type Sample = {
	id: number;
	prompt: string;
	imageUrl: string;
};

const samples: Sample[] = [
	{
		id: 1,
		prompt: 'Cinematic portrait of a neon samurai, volumetric lighting, ultra sharp, anamorphic lens flare',
		imageUrl:
			'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 2,
		prompt: 'Moody product render of wireless earbuds on marble pedestal, dramatic rim light, premium aesthetic',
		imageUrl:
			'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 3,
		prompt: 'Whimsical children’s book illustration of a fox piloting a hot air balloon over mountains at sunrise',
		imageUrl:
			'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 4,
		prompt: 'Isometric sci-fi cityscape, glowing signage, reflective puddles, cinematic depth of field',
		imageUrl:
			'https://images.unsplash.com/photo-1526481280695-3c469928b67b?auto=format&fit=crop&w=1200&q=80',
	},
];

const vibes = ['Vibrant', 'Photoreal', 'Illustrative', 'Minimal', 'Surreal'];

const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 1100));

export default function PromptPlayground() {
	const [prompt, setPrompt] = useState('Futuristic eco city skyline at golden hour, aerial view, lush biophilic design');
	const [selectedVibe, setSelectedVibe] = useState<string>('Vibrant');
	const [isLoading, setIsLoading] = useState(false);
	const [activeSample, setActiveSample] = useState<Sample>(samples[0]);
	const [message, setMessage] = useState<string | null>(null);
	const [history, setHistory] = useState<Sample[]>([samples[0]]);

	const filteredHistory = useMemo(() => {
		const seen = new Set<number>();
		return [activeSample, ...history]
			.filter((item) => {
				if (seen.has(item.id)) return false;
				seen.add(item.id);
				return true;
			})
			.slice(0, 4);
	}, [activeSample, history]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!prompt.trim()) {
			setMessage('Add a bit more detail to your prompt to get the best results.');
			return;
		}

		setIsLoading(true);
		setMessage('Generating preview...');

		await fakeDelay();

		const nextSample = samples[Math.floor(Math.random() * samples.length)];
		setActiveSample({ ...nextSample, prompt });
		setHistory((prev) => [{ ...nextSample, prompt }, ...prev]);
		setMessage('This is a mocked preview. Connect the API to see real results.');
		setIsLoading(false);
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(prompt);
		setMessage('Prompt copied to clipboard!');
	};

	return (
		<div className="flex flex-col gap-6 p-6 text-slate-200 sm:p-8">
			<form className="space-y-5" onSubmit={handleSubmit}>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<label className="text-sm font-semibold uppercase tracking-widest" htmlFor="playground-prompt">
							Prompt
						</label>
						<button
							type="button"
							onClick={handleCopy}
							className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
						>
							Copy
						</button>
					</div>
					<textarea
						id="playground-prompt"
						value={prompt}
						onChange={(event) => setPrompt(event.target.value)}
						rows={4}
						className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
						placeholder="Describe the scene you want to create..."
					/>
				</div>
				<div className="space-y-3">
					<p className="text-sm font-semibold uppercase tracking-widest">Pick a vibe</p>
					<div className="flex flex-wrap gap-3">
						{vibes.map((vibe) => (
							<button
								type="button"
								key={vibe}
								onClick={() => setSelectedVibe(vibe)}
								className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
									selectedVibe === vibe
										? 'border-emerald-400/80 bg-emerald-400/20 text-emerald-200'
										: 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
								}`}
							>
								{vibe}
							</button>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<button
						type="submit"
						disabled={isLoading}
						className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? 'Generating…' : 'Generate preview'}
					</button>
					<span className="text-xs text-slate-400">
						Mocked response — live API hooks landing Q4 2025.
					</span>
				</div>
			</form>
			{message ? (
				<p role="status" className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
					{message}
				</p>
			) : null}
			<div className="space-y-4">
				<div className="aspect-[4/3] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
					{isLoading ? (
						<div className="flex h-full w-full items-center justify-center bg-slate-900/80">
							<div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-400" aria-label="Loading" />
						</div>
					) : (
						<img
							src={activeSample.imageUrl}
							alt={activeSample.prompt}
							className="h-full w-full object-cover"
						/>
					)}
				</div>
				<div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
					<p className="mb-2 font-semibold text-slate-100">Prompt</p>
					<p className="text-slate-300">{activeSample.prompt}</p>
					<p className="mt-3 text-xs uppercase tracking-widest text-slate-500">Vibe: {selectedVibe}</p>
				</div>
				<div className="space-y-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Recent previews</p>
					<div className="grid gap-3 sm:grid-cols-2">
						{filteredHistory.map((item) => (
							<button
								key={item.id}
								onClick={() => setActiveSample(item)}
								className="group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-left transition hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
							>
								<img
									src={item.imageUrl}
									alt="Generated sample thumbnail"
									className="h-12 w-12 rounded-xl object-cover"
								/>
								<div>
									<p className="text-xs font-semibold text-slate-100 line-clamp-2">{item.prompt}</p>
									<p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
										Preview
									</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
