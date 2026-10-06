import { Avatar, Card, buttonVariants } from '@heroui/react';
import { RiDownloadLine } from 'react-icons/ri';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/**
 * Profile picture, name, bio and résumé button.
 */
const AvatarCard = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
}: {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}) => {
  const isLoading = loading || !profile;

  return (
    <Card className="items-center px-6 py-8 text-center">
      {isLoading ? (
        skeleton({ widthCls: 'size-32' })
      ) : (
        <Avatar
          className={`size-32 rounded-full text-3xl [&_img]:rounded-full ${
            avatarRing
              ? 'ring-2 ring-accent ring-offset-4 ring-offset-surface'
              : ''
          }`}
        >
          <Avatar.Image
            src={profile.avatar || FALLBACK_IMAGE}
            alt={profile.name}
          />
          <Avatar.Fallback>{initials(profile.name)}</Avatar.Fallback>
        </Avatar>
      )}

      <Card.Header className="mt-6 items-center gap-2">
        <Card.Title className="text-2xl font-semibold tracking-tight">
          {isLoading
            ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            : profile.name}
        </Card.Title>
        <Card.Description className="text-balance">
          {isLoading
            ? skeleton({ widthCls: 'w-56', heightCls: 'h-5' })
            : profile.bio}
        </Card.Description>
      </Card.Header>

      {resumeFileUrl && (
        <Card.Footer className="mt-4 justify-center">
          {isLoading ? (
            skeleton({ widthCls: 'w-40', heightCls: 'h-9' })
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              download
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              <RiDownloadLine />
              Download résumé
            </a>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default AvatarCard;
