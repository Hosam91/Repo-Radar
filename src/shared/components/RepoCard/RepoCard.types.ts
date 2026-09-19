import type { ReactNode } from "react";

import type { SearchRepository } from "../../types/repository";

export interface RepoCardProps {
  repo: SearchRepository;
  children?: ReactNode;
  actions?: ReactNode;
}
