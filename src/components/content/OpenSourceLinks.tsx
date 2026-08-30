import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

interface OpenSourceLinksProps {
  project: string;
  repository: string;
  support?: string;
}

export function OpenSourceLinks({
  project,
  repository,
  support,
}: OpenSourceLinksProps) {
  return (
    <ButtonGroup className="mt-5">
      <Button asChild size="sm" variant="outline">
        <a href={repository} target="_blank" rel="noopener noreferrer">
          Repository
        </a>
      </Button>
      {support && (
        <Button asChild size="sm" variant="outline">
          <a href={support} target="_blank" rel="noopener noreferrer">
            Support {project}
          </a>
        </Button>
      )}
    </ButtonGroup>
  );
}
