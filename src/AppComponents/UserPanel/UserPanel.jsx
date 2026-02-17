import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./UserPanel.css";

const TABS = [
    { key: "stats", label: "📊 Statystyki" },
    { key: "votes", label: "🗳️ Historia Głosów" },
    { key: "achievements", label: "🏆 Osiągnięcia" },
];

const CATEGORY_LABELS = {
    creation: "🎬 Tworzenie Wieczorków",
    participation: "🎟️ Udział w Wieczorkach",
    voting: "🗳️ Głosowanie",
    special: "🏆 Specjalne",
};

export default function UserPanel({ apiOrigin, isOpen, onClose }) {
    const { authTokens } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("stats");
    const [panelData, setPanelData] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (!isOpen || !authTokens?.access) return;

        const fetchPanelData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiOrigin}/user-panel/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setPanelData(data);
                }
            } catch (err) {
                console.error("Failed to fetch user panel data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPanelData();
    }, [isOpen, authTokens]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="user-panel-overlay" onClick={handleOverlayClick}>
            <div className="user-panel-container">
                {/* HEADER */}
                <PanelHeader
                    profile={panelData?.profile}
                    rankProgress={panelData?.rankProgress}
                    apiOrigin={apiOrigin}
                    onClose={onClose}
                />

                {/* TAB NAV */}
                <div className="user-panel-tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            className={`user-panel-tab ${activeTab === tab.key ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="user-panel-content">
                    {loading ? (
                        <LoadingState />
                    ) : !panelData ? (
                        <ErrorState />
                    ) : (
                        <>
                            {activeTab === "stats" && <StatsTab stats={panelData.stats} />}
                            {activeTab === "votes" && (
                                <VoteHistoryTab votes={panelData.voteHistory} />
                            )}
                            {activeTab === "achievements" && (
                                <AchievementsTab apiOrigin={apiOrigin} achievements={panelData.achievements} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ================================================
   SUB-COMPONENTS
   ================================================ */

function PanelHeader({ profile, rankProgress, apiOrigin, onClose }) {
    const avatarUrl = profile?.avatar
        ? profile.avatar.startsWith("http")
            ? profile.avatar
            : `${apiOrigin.split("/api")[0]}${profile.avatar.startsWith("/") ? "" : "/"}${profile.avatar}`
        : null;

    return (
        <div className="user-panel-header">
            <div className="user-panel-header-left">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="user-panel-avatar" />
                ) : (
                    <div className="user-panel-avatar-placeholder">
                        <i className="pi pi-user"></i>
                    </div>
                )}
                <div className="user-panel-user-info">
                    <h2>{profile?.username || "Użytkownik"}</h2>
                    <p className="user-rank">
                        Lvl {rankProgress?.currentRank || 1} — {rankProgress?.currentRankLabel || profile?.rank || "Ranga nieznana"}
                    </p>
                </div>
            </div>
            <button className="user-panel-close-btn" onClick={onClose}>
                ✕
            </button>
            {/* Rank progress bar below header content */}
            {rankProgress && <RankProgressBar rankProgress={rankProgress} />}
        </div>
    );
}

function RankProgressBar({ rankProgress }) {
    const {
        totalPoints,
        currentRank,
        currentRankLabel,
        pointsInCurrentLevel,
        pointsNeededForNext,
        nextRankLabel,
        isMaxRank,
    } = rankProgress;

    const progressPercent = isMaxRank
        ? 100
        : pointsNeededForNext > 0
            ? Math.min((pointsInCurrentLevel / pointsNeededForNext) * 100, 100)
            : 0;

    return (
        <div className="rank-progress-section">
            <div className="rank-progress-labels">
                <span className="rank-current-label">🎬 {totalPoints} pkt</span>
                {!isMaxRank && (
                    <span className="rank-next-label">
                        Następna ranga: {nextRankLabel} ({pointsInCurrentLevel}/{pointsNeededForNext})
                    </span>
                )}
                {isMaxRank && (
                    <span className="rank-next-label rank-max">🏆 Maksymalny poziom!</span>
                )}
            </div>
            <div className="rank-filmstrip-bar">
                <div className="rank-filmstrip-holes left">
                    {[...Array(8)].map((_, i) => <div key={i} className="filmstrip-hole" />)}
                </div>
                <div className="rank-filmstrip-track">
                    <div
                        className="rank-filmstrip-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="rank-filmstrip-holes right">
                    {[...Array(8)].map((_, i) => <div key={i} className="filmstrip-hole" />)}
                </div>
            </div>
        </div>
    );
}

function LoadingState() {
    return (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🎬</div>
            <p style={{ fontFamily: "'Outfit', sans-serif" }}>Ładowanie danych...</p>
        </div>
    );
}

function ErrorState() {
    return (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>❌</div>
            <p style={{ fontFamily: "'Outfit', sans-serif" }}>
                Nie udało się pobrać danych.
            </p>
        </div>
    );
}

function StatsTab({ stats }) {
    const statCards = [
        {
            icon: "🎟️",
            value: stats.movieNightsParticipated,
            label: stats.movieNightsParticipated == 0 ? "Wieczorków" : stats.movieNightsParticipated == 1 ? "Wieczorek" : "Wieczorki",
        },
        {
            icon: "🎬",
            value: stats.movieNightsCreated,
            label: stats.movieNightsCreated == 0 ? "Wieczorków" : stats.movieNightsCreated == 1 ? "Wieczorek" : "Wieczorki",
        },
        {
            icon: "🗳️",
            value: stats.totalVotes,
            label: stats.totalVotes == 0 ? "Głosów" : "Głosy",
        },
        {
            icon: "🏆",
            value: stats.winningVotes,
            label: stats.winningVotes == 0 ? "Trafionych" : "Trafione",
        },
        {
            icon: "⏱️",
            value: stats.totalWinningRuntime || "0m",
            label: "Łącznie obejrzano",
        },
    ];

    const rankingSections = [
        {
            icon: "🎭",
            title: "Najczęściej Wybierane Gatunki",
            items: stats.topVotedGenres || [],
        },
        {
            icon: "📽️",
            title: "Gatunki Twoich Wieczorków",
            items: stats.topSelectedGenres || [],
        },
        {
            icon: "🎬",
            title: "Najczęściej Wybierani Reżyserzy",
            items: stats.topVotedDirectors || [],
        },
    ];

    return (
        <>
            <div className="stats-grid">
                {statCards.map((card, i) => (
                    <div className="stat-card" key={i}>
                        <div className="stat-card-icon">{card.icon}</div>
                        <div className="stat-card-value">{card.value}</div>
                        <div className="stat-card-label">{card.label}</div>
                    </div>
                ))}
            </div>

            {rankingSections.map((section, si) => (
                <StatsRankingSection key={si} {...section} />
            ))}
        </>
    );
}

function StatsRankingSection({ icon, title, items }) {
    if (!items || items.length === 0) {
        return (
            <div className="stats-ranking-section">
                <h3 className="stats-ranking-title">{icon} {title}</h3>
                <p className="stats-ranking-empty">Brak danych</p>
            </div>
        );
    }

    const maxCount = items[0]?.count || 1;

    return (
        <div className="stats-ranking-section">
            <h3 className="stats-ranking-title">{icon} {title}</h3>
            <div className="stats-ranking-list">
                {items.map((item, i) => {
                    const percent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    const medals = ["🥇", "🥈", "🥉"];
                    return (
                        <div className="stats-ranking-item" key={i}>
                            <span className="stats-ranking-medal">{medals[i] || `${i + 1}.`}</span>
                            <div className="stats-ranking-info">
                                <div className="stats-ranking-name-row">
                                    <span className="stats-ranking-name">{item.name}</span>
                                    <span className="stats-ranking-count">{item.count} głos{item.count === 1 ? '' : item.count < 5 ? 'y' : 'ów'}</span>
                                </div>
                                <div className="stats-ranking-bar-bg">
                                    <div
                                        className="stats-ranking-bar-fill"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ---- VOTE HISTORY TAB ---- */

function VoteHistoryTab({ votes }) {
    if (!votes || votes.length === 0) {
        return (
            <div className="vote-history-empty">
                <span className="empty-icon">🗳️</span>
                <p>Nie oddałeś jeszcze żadnego głosu.</p>
            </div>
        );
    }

    return (
        <div className="vote-history-list">
            {votes.map((vote, i) => (
                <div className="vote-history-item" key={i}>
                    {vote.movieCover ? (
                        <img
                            src={vote.movieCover}
                            alt={vote.movieTitle}
                            className="vote-history-poster"
                        />
                    ) : (
                        <div className="vote-history-poster-placeholder">🎬</div>
                    )}
                    <div className="vote-history-info">
                        <p className="vote-history-title">
                            {vote.movieTitle}{" "}
                            {vote.movieYear && (
                                <span style={{ color: "#666", fontWeight: "normal" }}>
                                    ({vote.movieYear})
                                </span>
                            )}
                        </p>
                        <p className="vote-history-meta">
                            <span>🎬 {vote.movieNightCategory}</span>
                            {vote.movieNightDate && <span>📅 {vote.movieNightDate}</span>}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ---- ACHIEVEMENTS TAB ---- */

function AchievementsTab({ apiOrigin, achievements }) {
    const allAchievements = achievements?.all || [];
    const unlockedCount = allAchievements.filter((a) => a.isUnlocked).length;
    const totalCount = allAchievements.length;

    // Group by category
    const categories = {};
    for (const ach of allAchievements) {
        if (!categories[ach.category]) {
            categories[ach.category] = [];
        }
        categories[ach.category].push(ach);
    }

    // Category display order
    const categoryOrder = ["creation", "participation", "voting", "special"];

    return (
        <>
            {/* Summary bar */}
            <div className="achievements-summary">
                <div className="achievements-summary-item">
                    <div className="achievements-summary-count">
                        {unlockedCount}/{totalCount}
                    </div>
                    <div className="achievements-summary-label">Odblokowane</div>
                </div>
                <div className="achievements-summary-item">
                    <div className="achievements-summary-count">
                        {allAchievements.filter((a) => a.tier === "gold" && a.isUnlocked).length}
                    </div>
                    <div className="achievements-summary-label">Złote</div>
                </div>
                <div className="achievements-summary-item">
                    <div className="achievements-summary-count">
                        {allAchievements.filter((a) => a.tier === "silver" && a.isUnlocked).length}
                    </div>
                    <div className="achievements-summary-label">Srebrne</div>
                </div>
                <div className="achievements-summary-item">
                    <div className="achievements-summary-count">
                        {allAchievements.filter((a) => a.tier === "bronze" && a.isUnlocked).length}
                    </div>
                    <div className="achievements-summary-label">Brązowe</div>
                </div>
            </div>

            {/* Category sections */}
            {categoryOrder.map((cat) => {
                const items = categories[cat];
                if (!items || items.length === 0) return null;
                return (
                    <div className="achievements-category" key={cat}>
                        <h3 className="achievements-category-title">
                            {CATEGORY_LABELS[cat] || cat}
                        </h3>
                        <div className="achievements-list">
                            {items.map((ach) => (
                                <AchievementCard key={ach.key} apiOrigin={apiOrigin} achievement={ach} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function AchievementCard({ apiOrigin, achievement }) {
    const {
        name,
        description,
        image,
        tier,
        tier_display,
        isUnlocked,
        progress,
        threshold,
        unlockedAt,
    } = achievement;

    const progressPercent = threshold > 0 ? (progress / threshold) * 100 : 0;

    // Generate trophy Image url
    const trophyUrl = achievement?.image
        ? achievement.image.startsWith("http")
            ? achievement.image
            : `${apiOrigin.split("/api")[0]}${achievement.image.startsWith("/") ? "" : "/"}${achievement.image}`
        : null;

    return (
        <div className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`}>
            {/* Square trophy icon (left) */}
            {image ? (
                <img src={trophyUrl} alt={name} className="achievement-trophy-img" />
            ) : (
                <div className={`achievement-trophy-icon tier-${tier}`}>🎬</div>
            )}

            {/* Info (right of icon) */}
            <div className="achievement-info">
                <p className="achievement-name">{name}</p>
                <p className="achievement-description">{description}</p>

                {/* Progress bar for locked */}
                {!isUnlocked && (
                    <div className="achievement-progress">
                        <div className="achievement-progress-bar">
                            <div
                                className={`achievement-progress-fill tier-${tier}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <span className="achievement-progress-text">
                            {progress}/{threshold}
                        </span>
                    </div>
                )}

                {/* Unlocked date */}
                {isUnlocked && unlockedAt && (
                    <p className="achievement-unlocked-date">
                        ✓ Odblokowano: {new Date(unlockedAt).toLocaleDateString("pl-PL")}
                    </p>
                )}
            </div>

            {/* Tier badge */}
            <span className={`achievement-tier-badge tier-${tier}`}>
                {tier_display}
            </span>
        </div>
    );
}
