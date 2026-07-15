import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCheck, VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { appConfig } from '@/config/app.config'
import { chatNotifications, chatThreads } from '@/data/chat'
import { useLayoutStore } from '@/features/layout/layout-store'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import './chat-overlay.css'

const EASE = [0.35, 0, 0.25, 1] as const
type ChatTab = 'messages' | 'notifications' | 'settings'

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e5e5ea`
}

export function ChatOverlay() {
  const { t } = useTranslation()
  const open = useLayoutStore((s) => s.chatOverlayOpen)
  const setOpen = useLayoutStore((s) => s.setChatOverlayOpen)
  const isMobile = useIsMobile()
  const [tab, setTab] = useState<ChatTab>('messages')
  const [activeId, setActiveId] = useState(chatThreads[0]?.id ?? '')
  const [draft, setDraft] = useState('')
  const [closing, setClosing] = useState(false)
  const [origin, setOrigin] = useState({ x: 40, y: 760 })
  const messagesRef = useRef<HTMLDivElement>(null)

  const active = chatThreads.find((item) => item.id === activeId) ?? chatThreads[0]

  const diameter = useMemo(() => {
    if (typeof window === 'undefined') return 3000
    return Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2
  }, [open])

  useEffect(() => {
    if (!open) {
      setClosing(false)
      return
    }
    // Circle opens/closes into the bottom-left X
    setOrigin({ x: 40, y: window.innerHeight - 40 })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWithSpin()
    }
    const onResize = () => setOrigin({ x: 40, y: window.innerHeight - 40 })
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    window.setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    }, 700)
  }, [open, activeId])

  const closeWithSpin = () => {
    if (closing) return
    setClosing(true)
    // MCM menu close: rotating immediately → shrink @200ms (500ms) → clear @~700ms
    // Spin runs 800ms; keep overlay until spin finishes so the turn is fully visible
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 850)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="awa-chat-root" role="dialog" aria-modal="true" aria-label={t('nav.apps.chat')}>
          <motion.div
            className="awa-chat-wipe"
            style={{
              width: diameter,
              height: diameter,
              left: origin.x,
              top: origin.y,
              marginLeft: -diameter / 2,
              marginTop: -diameter / 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: closing ? 0 : 1 }}
            transition={{
              duration: 0.5,
              delay: closing ? 0.2 : 0,
              ease: [0.42, 0, 0.58, 1],
            }}
          />

          {/*
            Exact MCM .nav-menu placement — FIXED above wipe/content.
            Close spin lives here (menu X), NOT the chat .nav-user cross.
          */}
          <button
            type="button"
            className={cn(
              'awa-chat-nav-menu',
              'is-active',
              closing && 'is-rotating',
            )}
            onClick={closeWithSpin}
            aria-label={t('actions.close')}
          >
            <div className="awa-chat-hamburger">
              <span className="patty" />
              <span className="patty" />
              <span className="patty" />
              <span className="patty" />
              <span className="patty" />
              <span className="patty" />
            </div>
          </button>

          <div className={cn('awa-chat-shell', closing && 'is-closing')}>
            <aside className={cn('awa-chat-rail', closing && 'is-closing')}>
              <div className="awa-chat-rail-brand">
                <span>
                  {appConfig.shortName} {appConfig.productLabel}
                </span>
              </div>
            </aside>

            <motion.div
              className="awa-chat-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: closing ? 0 : 1 }}
              transition={{
                duration: 0.35,
                delay: closing ? 0.2 : 0.22,
                ease: EASE,
              }}
            >
              {/* Tabs scale in first (delay ~350ms like MCM .nav) */}
              <motion.div
                className="awa-chat-tabs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: closing ? 0 : 1,
                  scale: closing ? 0.85 : 1,
                }}
                transition={{
                  duration: 0.28,
                  delay: closing ? 0 : 0.35,
                  ease: EASE,
                }}
              >
                <button
                  type="button"
                  className={cn('awa-chat-tab', tab === 'messages' && 'is-active')}
                  onClick={() => setTab('messages')}
                >
                  Messages
                </button>
                <button
                  type="button"
                  className={cn('awa-chat-tab', tab === 'notifications' && 'is-active')}
                  onClick={() => setTab('notifications')}
                >
                  Notifications
                  <span className="awa-chat-tab-badge">3</span>
                </button>
                <button
                  type="button"
                  className={cn('awa-chat-tab', tab === 'settings' && 'is-active')}
                  onClick={() => setTab('settings')}
                >
                  Settings
                </button>
              </motion.div>

              {/* Tab content scales next (delay ~380ms) */}
              <motion.div
                className={cn(
                  'awa-chat-body',
                  isMobile && activeId && 'is-thread-open',
                )}
                initial={{ opacity: 0, scale: 0, borderRadius: '50%' }}
                animate={{
                  opacity: closing ? 0 : 1,
                  scale: closing ? 0.9 : 1,
                  borderRadius: closing ? '40%' : '0%',
                }}
                transition={{
                  duration: 0.28,
                  delay: closing ? 0 : 0.38,
                  ease: EASE,
                }}
              >
                {tab === 'messages' ? (
                  <>
                    {/* Message list scales later (delay ~560ms) */}
                    <motion.div
                      className="awa-chat-list"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: closing ? 0 : 1,
                        scale: closing ? 0.92 : 1,
                      }}
                      transition={{
                        duration: 0.28,
                        delay: closing ? 0 : 0.56,
                        ease: EASE,
                      }}
                    >
                      {chatThreads.map((thread) => (
                        <button
                          key={thread.id}
                          type="button"
                          className={cn(
                            'awa-chat-list-item',
                            activeId === thread.id && 'is-selected',
                          )}
                          onClick={() => setActiveId(thread.id)}
                        >
                          <img
                            src={avatarUrl(thread.avatarSeed)}
                            alt=""
                            className="awa-chat-list-avatar"
                          />
                          <div className="awa-chat-list-main">
                            <span className="awa-chat-list-title">{thread.name}</span>
                            <span className="awa-chat-list-caption">
                              {thread.lastMessage}
                            </span>
                          </div>
                          <div className="awa-chat-list-meta">
                            <span>{thread.time}</span>
                            {thread.statusIcon === 'muted' ? (
                              <VolumeX />
                            ) : (
                              <CheckCheck strokeWidth={2.25} />
                            )}
                          </div>
                        </button>
                      ))}
                    </motion.div>

                    {/* Conversation + composer (delay ~660ms) */}
                    <motion.div
                      className="awa-chat-thread"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: closing ? 0 : 1,
                        scale: closing ? 0.94 : 1,
                      }}
                      transition={{
                        duration: 0.28,
                        delay: closing ? 0 : 0.66,
                        ease: EASE,
                      }}
                    >
                      <div className="awa-chat-messages" ref={messagesRef}>
                        {active?.conversation.map((group) => (
                          <div
                            key={group.id}
                            className={cn(
                              'awa-chat-group',
                              group.isOwn && 'is-own',
                            )}
                          >
                            <div className="awa-chat-bubbles">
                              {group.bubbles.map((text) => (
                                <div key={text.slice(0, 24)} className="awa-chat-bubble">
                                  {text}
                                </div>
                              ))}
                            </div>
                            <img
                              src={avatarUrl(group.avatarSeed)}
                              alt=""
                              className="awa-chat-group-avatar"
                            />
                          </div>
                        ))}
                      </div>

                      <form
                        className="awa-chat-composer"
                        onSubmit={(e) => {
                          e.preventDefault()
                          setDraft('')
                        }}
                      >
                        <textarea
                          rows={1}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Message"
                        />
                        <button type="submit" className="awa-chat-send">
                          Send
                        </button>
                      </form>
                    </motion.div>
                  </>
                ) : null}

                {tab === 'notifications' ? (
                  <div className="awa-chat-panel-blank" style={{ width: '100%' }}>
                    <div style={{ maxWidth: 720, margin: '0 auto' }}>
                      {chatNotifications.map((item) => (
                        <div key={item.id} className="awa-chat-notif">
                          <div className="awa-chat-notif-caption">{item.caption}</div>
                          <div className="awa-chat-notif-meta">
                            <span>{item.time}</span>
                            {item.unread ? <span className="awa-chat-dot" /> : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {tab === 'settings' ? (
                  <div className="awa-chat-panel-blank" style={{ width: '100%' }}>
                    <div style={{ maxWidth: 560 }}>
                      <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Settings</h3>
                      <ul style={{ margin: 0, padding: '0 0 0 8px', listStyle: 'none' }}>
                        {[
                          'Desktop notifications',
                          'Message sounds',
                          'Show online status',
                          'Read receipts',
                        ].map((label) => (
                          <li
                            key={label}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '14px 0',
                              borderBottom: '1px solid #f0f0f0',
                              fontSize: 15,
                            }}
                          >
                            <span>{label}</span>
                            <input type="checkbox" defaultChecked />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
