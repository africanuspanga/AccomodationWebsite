import type { VolunteerProgram } from '@/data/volunteer-programs';

export interface AdminVolunteerProgram {
  id: string;
  slug?: string | null;
  title?: string | null;
  location?: string | null;
  country?: string | null;
  flag?: string | null;
  minAge?: string | null;
  duration?: string | null;
  cost?: string | null;
  focusAreas?: string[] | null;
  image?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  fullExplanation?: string | null;
  activities?: string | Partial<VolunteerProgram['activities']> | null;
  highlights?: string[] | null;
}

const defaultActivities: VolunteerProgram['activities'] = {
  safari: false,
  hiking: false,
  mountainClimbing: false,
  culturalTours: false,
};

export function generateVolunteerSlug(text?: string | null): string {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getVolunteerProgramSlug(
  program: Pick<VolunteerProgram, 'id' | 'slug' | 'title'>,
): string {
  return program.slug?.trim() || generateVolunteerSlug(program.title) || program.id;
}

export function parseVolunteerActivities(
  value: AdminVolunteerProgram['activities'],
): VolunteerProgram['activities'] {
  if (!value) {
    return { ...defaultActivities };
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return { ...defaultActivities, ...parsed };
    } catch {
      return { ...defaultActivities };
    }
  }

  return { ...defaultActivities, ...value };
}

export function normalizeAdminVolunteerProgram(
  program: AdminVolunteerProgram,
): VolunteerProgram {
  return {
    id: program.id,
    slug: program.slug?.trim() || generateVolunteerSlug(program.title || program.id),
    title: program.title || '',
    location: program.location || '',
    country: program.country || '',
    flag: program.flag || '',
    minAge: program.minAge || '',
    duration: program.duration || '',
    cost: program.cost || '',
    focusAreas: program.focusAreas || [],
    image: program.image || program.imageUrl || '',
    description: program.description || '',
    fullExplanation: program.fullExplanation || '',
    activities: parseVolunteerActivities(program.activities),
    highlights: program.highlights || [],
  };
}

export function mergeVolunteerPrograms(
  adminPrograms: AdminVolunteerProgram[],
  staticPrograms: VolunteerProgram[],
): VolunteerProgram[] {
  return [
    ...adminPrograms.map(normalizeAdminVolunteerProgram),
    ...staticPrograms,
  ];
}
