export interface WorkflowAuthor {
  name: string;
  github: string;
  avatar?: string;
  bio?: string;
}

export interface WorkflowSkill {
  name: string;
  description: string;
}

export interface TokenEstimate {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  confidence: 'measured' | 'estimated';
  note?: string;
}

export interface WorkflowStep {
  name: string;
  description: string;
  methodologyCount: number;
  tokenEstimate?: TokenEstimate;
}

export interface McpRequirement {
  required: boolean;
  plainName?: string;
  plainDescription?: string;
  setupUrl?: string;
  setupTime?: string;
}

export interface EnvRequirement {
  required: boolean;
  description?: string;
}

export interface WorkflowInput {
  name: string;
  description: string;
  example?: string;
}

export interface SetupStep {
  title: string;
  description: string;
  required: boolean;
  mcpServer?: string;
  envVar?: string;
  actionUrl?: string;
  timeEstimate?: string;
}

export interface Prerequisite {
  label: string;
  description: string;
  url?: string;
  timeEstimate?: string;
  cost?: string;
}

export interface Workflow {
  name: string;
  displayName: string;
  description: string;
  author: WorkflowAuthor;
  version: string;
  category: string;
  tags: string[];
  installs: number;
  rating: number;
  skills: WorkflowSkill[];
  steps?: WorkflowStep[];
  mcp: Record<string, McpRequirement>;
  env?: Record<string, EnvRequirement>;
  repository: string;
  license?: string;
  readme?: string;
  tagline?: string;
  benefits?: string[];
  inputs?: WorkflowInput[];
  prerequisites?: string[];
  prerequisiteDetails?: Prerequisite[];
  setupSteps?: SetupStep[];
  estimatedTime?: string;
  setupTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  detailedProcess?: string;
  outputDescription?: string;
  costInfo?: string;
  limitations?: string[];
  differentiators?: string[];
  heroColor?: string;
  tokenEstimate?: TokenEstimate;
}

// Supabase database types (for future use)

export interface DbWorkflow {
  id: string;
  name: string;
  display_name: string;
  description: string;
  author_id: string;
  category: string;
  tags: string[];
  repository: string;
  license: string | null;
  readme: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbVersion {
  id: string;
  workflow_id: string;
  version: string;
  manifest: Record<string, unknown>;
  published_at: string;
}

export interface DbInstall {
  id: string;
  workflow_id: string;
  version: string;
  user_agent: string | null;
  created_at: string;
}

export interface DbReview {
  id: string;
  workflow_id: string;
  author_name: string;
  rating: number;
  body: string | null;
  created_at: string;
}

export interface DbProfile {
  id: string;
  username: string;
  github: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      workflows: {
        Row: DbWorkflow;
        Insert: {
          name: string;
          display_name: string;
          description: string;
          author_id: string;
          category: string;
          tags: string[];
          repository: string;
          license?: string | null;
          readme?: string | null;
        };
        Update: {
          name?: string;
          display_name?: string;
          description?: string;
          author_id?: string;
          category?: string;
          tags?: string[];
          repository?: string;
          license?: string | null;
          readme?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workflows_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      versions: {
        Row: DbVersion;
        Insert: {
          workflow_id: string;
          version: string;
          manifest?: Record<string, unknown>;
        };
        Update: {
          workflow_id?: string;
          version?: string;
          manifest?: Record<string, unknown>;
        };
        Relationships: [
          {
            foreignKeyName: "versions_workflow_id_fkey";
            columns: ["workflow_id"];
            isOneToOne: false;
            referencedRelation: "workflows";
            referencedColumns: ["id"];
          },
        ];
      };
      installs: {
        Row: DbInstall;
        Insert: {
          workflow_id: string;
          version: string;
          user_agent?: string | null;
        };
        Update: {
          workflow_id?: string;
          version?: string;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "installs_workflow_id_fkey";
            columns: ["workflow_id"];
            isOneToOne: false;
            referencedRelation: "workflows";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: DbReview;
        Insert: {
          workflow_id: string;
          author_name: string;
          rating: number;
          body?: string | null;
        };
        Update: {
          workflow_id?: string;
          author_name?: string;
          rating?: number;
          body?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_workflow_id_fkey";
            columns: ["workflow_id"];
            isOneToOne: false;
            referencedRelation: "workflows";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: DbProfile;
        Insert: {
          id: string;
          username: string;
          github: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          username?: string;
          github?: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      workflow_stats: {
        Row: {
          workflow_id: string;
          name: string;
          install_count: number;
          avg_rating: number;
          review_count: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
