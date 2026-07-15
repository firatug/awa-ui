import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/spinner'
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@/components/ui/modal'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { popupAlert } from '@/components/feedback/popup-alert'
import { toast } from '@/components/feedback/toast'

export function FeedbackPage() {
  const { t } = useTranslation()
  const [showSkeleton, setShowSkeleton] = useState(true)

  return (
    <div>
      <PageHeader
        title={t('nav.components.feedback')}
        description={t('pages.components.description')}
      />

      <div className="space-y-[var(--density-gap)]">
        <Card>
          <CardHeader
            title="Popup alerts"
            description="Centered, animated confirmations — click to preview"
          />
          <CardContent className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                popupAlert.success(
                  'Saved successfully',
                  'Your changes have been applied to the workspace.',
                )
              }
            >
              Success
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                popupAlert.error(
                  'Something went wrong',
                  'We could not complete this action. Please try again.',
                )
              }
            >
              Error
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                popupAlert.warning(
                  'Unsaved changes',
                  'Leave this page and lose your edits?',
                )
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                popupAlert.info(
                  'New update available',
                  'Version 1.2 is ready. Reload to get the latest improvements.',
                )
              }
            >
              Info
            </Button>
            <Button
              variant="soft"
              onClick={() =>
                popupAlert.show({
                  title: 'Delete this record?',
                  description: 'This action cannot be undone.',
                  variant: 'error',
                  confirmLabel: t('actions.delete'),
                  cancelLabel: t('actions.cancel'),
                  onConfirm: () => toast.success('Record deleted'),
                })
              }
            >
              Confirm dialog
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Inline alerts" />
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Alert variant="info" title="Information">
              Use alerts for contextual messages.
            </Alert>
            <Alert variant="success" title="Success">
              {t('form.savedSuccessfully')}
            </Alert>
            <Alert variant="warning" title="Warning">
              {t('form.unsavedChanges')}
            </Alert>
            <Alert variant="danger" title="Error">
              {t('form.validationError')}
            </Alert>
          </CardContent>
        </Card>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader title="Modal" />
            <CardContent>
              <Modal>
                <ModalTrigger asChild>
                  <Button>Open Modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Delete item?</ModalTitle>
                    <ModalDescription>
                      This action cannot be undone.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <ModalClose asChild>
                      <Button variant="outline">{t('actions.cancel')}</Button>
                    </ModalClose>
                    <Button variant="danger">{t('actions.delete')}</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Drawer" />
            <CardContent>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                    <DrawerDescription>
                      Adjust your view preferences
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <p className="text-[var(--text-body-sm)] text-[var(--color-text-secondary)]">
                      Drawer content goes here.
                    </p>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">{t('actions.cancel')}</Button>
                    </DrawerClose>
                    <Button>{t('actions.apply')}</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader title="Toasts" description="Corner notifications" />
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast('Default toast')}>
              Default
            </Button>
            <Button variant="outline" onClick={() => toast.success('Success!')}>
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error('Error occurred')}
            >
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning('Warning message')}
            >
              Warning
            </Button>
            <Button variant="outline" onClick={() => toast.info('Info message')}>
              Info
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-[var(--density-gap)] lg:grid-cols-2">
          <Card>
            <CardHeader
              title="Skeletons"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSkeleton(!showSkeleton)}
                >
                  Toggle
                </Button>
              }
            />
            <CardContent>
              {showSkeleton ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-20 w-full rounded-[var(--radius-lg)]" />
                </div>
              ) : (
                <p className="text-[var(--text-body-sm)]">
                  Content loaded successfully.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Loading & Empty" />
            <CardContent className="flex flex-col items-center gap-6">
              <Spinner size="lg" />
              <EmptyState
                title={t('empty.noSearchResults')}
                description={t('empty.noSearchResultsDescription')}
                size="sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
