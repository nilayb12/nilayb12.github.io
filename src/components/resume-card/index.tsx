'use client';

import { Button, Card, Modal, buttonVariants } from '@heroui/react';
import { useEffect, useState } from 'react';
import { TbDownload, TbExternalLink, TbEye, TbFileCv } from 'react-icons/tb';
import type { ResumeInfo } from '../../interfaces/resume';
import { ga } from '../../utils';
import CardHeading from '../card-heading';

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/**
 * Whether this browser can show a PDF inside the page. True on desktop
 * Chrome, Edge, Firefox and Safari. False on phones and tablets: Android
 * Chrome can't render PDFs in a page at all, and iOS shows only the first page.
 */
const canEmbedPdf = () =>
  typeof navigator !== 'undefined' &&
  navigator.pdfViewerEnabled === true &&
  window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;

/**
 * Résumé card. Preview opens the PDF in a pop-up over the page using the
 * browser's own PDF viewer; where that isn't supported it opens a new tab.
 * Download saves it with a readable file name.
 */
const ResumeCard = ({
  resume,
  googleAnalyticsId,
}: {
  resume: ResumeInfo;
  googleAnalyticsId?: string;
}) => {
  // Starts as a plain link (works everywhere, even without JavaScript),
  // then upgrades to the pop-up where the browser supports it.
  const [embed, setEmbed] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmbed(canEmbedPdf());
  }, []);

  const track = (action: string) => {
    if (googleAnalyticsId) ga.event(action, {});
  };

  const downloadProps = {
    href: resume.url,
    // Same-site files download under this name; files hosted elsewhere
    // just open, as browsers don't allow renaming them.
    download: resume.local ? resume.downloadName : undefined,
    target: resume.local ? undefined : '_blank',
    rel: 'noreferrer',
    onClick: () => track('Download resume'),
  };

  const previewButtonClass = `${buttonVariants({ variant: 'secondary' })} w-full`;

  return (
    <Card>
      <CardHeading icon={<TbFileCv />} loading={false}>
        Résumé
      </CardHeading>
      <Card.Content className="gap-4">
        <p className="text-sm text-muted">
          PDF{resume.size ? ` · ${formatSize(resume.size)}` : ''}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {embed ? (
            <Modal>
              <Button
                variant="secondary"
                className="w-full"
                onPress={() => track('Preview resume')}
              >
                <TbEye aria-hidden />
                Preview
              </Button>
              <Modal.Backdrop variant="blur">
                <Modal.Container size="lg" placement="center">
                  <Modal.Dialog className="flex h-[90vh] w-[min(96vw,64rem)] max-w-none flex-col gap-0 p-0">
                    <Modal.Header className="flex-row items-center gap-2 py-3 pe-14 ps-5">
                      <TbFileCv aria-hidden className="text-lg text-accent" />
                      <Modal.Heading className="flex-1 text-base">
                        Résumé
                      </Modal.Heading>
                      <a
                        href={resume.url}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                        })}
                      >
                        <TbExternalLink aria-hidden />
                        <span className="max-md:hidden">Open in new tab</span>
                      </a>
                      <a
                        {...downloadProps}
                        className={buttonVariants({
                          variant: 'primary',
                          size: 'sm',
                        })}
                      >
                        <TbDownload aria-hidden />
                        Download
                      </a>
                    </Modal.Header>
                    <Modal.Body className="min-h-0 flex-1 p-0">
                      <iframe
                        title="Résumé (PDF)"
                        // The browser's built-in viewer; FitH fits the page width
                        src={`${resume.url}#view=FitH`}
                        className="size-full border-0 bg-surface-secondary"
                      />
                    </Modal.Body>
                    <Modal.CloseTrigger />
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          ) : (
            <a
              href={resume.url}
              target="_blank"
              rel="noreferrer"
              className={previewButtonClass}
              onClick={() => track('Preview resume')}
            >
              <TbEye aria-hidden />
              Preview
            </a>
          )}
          <a
            {...downloadProps}
            className={`${buttonVariants({ variant: 'primary' })} w-full`}
          >
            <TbDownload aria-hidden />
            Download
          </a>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ResumeCard;
