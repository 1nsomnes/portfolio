import type { Paper } from '../data/types'
import { formatMonth } from '../lib/dates'

export default function Papers({ papers, author }: { papers: Paper[]; author: string }) {
  return (
    <ol className="divide-y divide-rule">
      {papers.map((paper) => (
        <li key={paper.title} className="py-5 first:pt-0 last:pb-0">
          <h3 className="font-semibold">
            {paper.url ? (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
              >
                {paper.title}
              </a>
            ) : (
              paper.title
            )}
          </h3>
          {paper.authors && (
            <p className="mt-1 text-sm text-ink-2">
              {paper.authors.map((name, i) => (
                <span key={name}>
                  {i > 0 && ', '}
                  {name === author ? <span className="font-semibold text-ink">{name}</span> : name}
                </span>
              ))}
            </p>
          )}
          {(paper.venue || paper.date) && (
            <p className="text-sm text-ink-3">
              {paper.venue && <i>{paper.venue}</i>}
              {paper.venue && paper.date && ', '}
              {paper.date && <span className="tabular-nums">{formatMonth(paper.date)}</span>}
            </p>
          )}
          {paper.description && <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{paper.description}</p>}
        </li>
      ))}
    </ol>
  )
}
