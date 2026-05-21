import React, { useMemo, useState, useEffect } from 'react';
import './DataTable.css';

export interface Trader {
    id: number;
    fullNameWithoutTitles: string;
    avatar: string;
    numberOfDeals: number;
    totalAmount: number;
    trendPercent: number;
    sharePercent: number;
    region: string;
    team: string;
    month: string;
    badge?: string;
}

// === Pomocné formátovací funkce ===
function formatCurrency(value: number) {
    return value.toLocaleString('cs-CZ') + ' Kč';
}

function formatPercent(n: number) {
    return (n > 0 ? '+' : '') + n + ' %';
}

function formatMonthName(yyyyMM: string) {
    if (!yyyyMM) return '';
    const [year, monthNum] = yyyyMM.split('-');
    const date = new Date(parseInt(year, 10), parseInt(monthNum, 10) - 1);
    const str = date.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' });
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Hook pro animované "natočení" čísel (KPI metrik)
function useCountUp(endValue: number, durationStr = 1000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / durationStr, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(endValue * easeOut));

            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [endValue, durationStr]);

    return count;
}

type SortKey = 'deals' | 'value' | 'trendPercent' | 'sharePercent' | 'name';
type SortOrder = 'asc' | 'desc';

interface DataTableProps {
    data: Trader[];
    darkMode: boolean;
    isLoading: boolean;
}

// === Hlavní komponenta tabulky ===
export function DataTable({ data = [], darkMode, isLoading }: DataTableProps) {

    // Načtení parametrů filtru z URL (pro možnost sdílení odkazu)
    const getInitialParam = (key: string, fallback: string) => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return params.get(key) || fallback;
        }
        return fallback;
    };

    const [month, setMonth] = useState<string>(getInitialParam('month', ''));
    const [nameFilter, setNameFilter] = useState<string>(getInitialParam('name', ''));
    const [regionFilter, setRegionFilter] = useState<string>(getInitialParam('region', 'Vše'));
    const [teamFilter, setTeamFilter] = useState<string>(getInitialParam('team', 'Vše'));

    const [sortKey, setSortKey] = useState<SortKey>('value');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    // Průběžná aktualizace URL parametrů při každé změně filtrů
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (month) params.set('month', month); else params.delete('month');
            if (nameFilter) params.set('name', nameFilter); else params.delete('name');
            if (regionFilter !== 'Vše') params.set('region', regionFilter); else params.delete('region');
            if (teamFilter !== 'Vše') params.set('team', teamFilter); else params.delete('team');

            const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [month, nameFilter, regionFilter, teamFilter]);

    // Generování unikátních voleb z dostupných dat (odstranění prázdných hodnot)
    const regions = Array.from(new Set(data.map((r) => r.region))).filter(Boolean);
    const teams = Array.from(new Set(data.map((r) => r.team))).filter(Boolean);
    const uniqueMonths = Array.from(new Set(data.map((r) => r.month))).filter(Boolean).sort().reverse();

    // Filtrace a řazení
    const filteredAndSorted = useMemo(() => {
        let result = [...data]
            .filter((r) => (month ? r.month === month : true))
            .filter((r) => (nameFilter ? r.fullNameWithoutTitles.toLowerCase().includes(nameFilter.toLowerCase()) : true))
            .filter((r) => (regionFilter === 'Vše' ? true : r.region === regionFilter))
            .filter((r) => (teamFilter === 'Vše' ? true : r.team === teamFilter));

        result.sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [data, month, nameFilter, regionFilter, teamFilter, sortKey, sortOrder]);

    // Rozdělení uživatelů na zóny (Pódium, těsně pod vrcholem, a zbytek v tabulce)
    const top3 = filteredAndSorted.slice(0, 3);
    const places4to6 = filteredAndSorted.slice(3, 6);
    const rest = filteredAndSorted.slice(6);

    const totalValue = filteredAndSorted.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalDeals = filteredAndSorted.reduce((acc, curr) => acc + curr.numberOfDeals, 0);

    const animatedTotalValue = useCountUp(totalValue);
    const animatedTotalDeals = useCountUp(totalDeals);

    const clearFilters = () => {
        setMonth(''); setNameFilter(''); setRegionFilter('Vše'); setTeamFilter('Vše');
        setSortKey('value'); setSortOrder('desc');
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) { setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }
        else { setSortKey(key); setSortOrder('desc'); }
    };

    const getSortIcon = (key: SortKey) => {
        if (sortKey === key) return <span className="sort-icon active">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
        return <span className="sort-icon inactive">↕</span>;
    };

    const renderSkeletons = () => (
        <div className="skeleton-wrapper">
            <div className="skeleton title-skeleton"></div>
            <div className="kpi-skeleton-group">
                <div className="skeleton kpi-skeleton"></div>
                <div className="skeleton kpi-skeleton"></div>
            </div>
            <div className="skeleton filter-skeleton"></div>
            <div className="podium-skeleton-group">
                <div className="skeleton podium-card-skeleton silver"></div>
                <div className="skeleton podium-card-skeleton gold"></div>
                <div className="skeleton podium-card-skeleton bronze"></div>
            </div>
        </div>
    );

    // Změna renderu během načítání z API
    if (isLoading) return <div className={`cr-dashboard ${darkMode ? 'dark-mode' : ''}`}>{renderSkeletons()}</div>;

    return (
        <div className={`cr-dashboard fade-in ${darkMode ? 'dark-mode' : ''}`}>

            {/* Hlavička a globální KPI */}
            <div className="cr-header">
                <div className="cr-title-area">
                    <h1 className="cr-title">Žebříček obchodníků</h1>
                    <p className="cr-subtitle">Měsíční přehled a výkonnost týmu</p>
                </div>
                <div className="cr-header-actions">
                    <div className="cr-kpi-cards">
                        <div className="kpi-card">
                            <span className="kpi-label">Celkový obrat</span>
                            <span className="kpi-value text-gradient">{formatCurrency(animatedTotalValue)}</span>
                        </div>
                        <div className="kpi-card">
                            <span className="kpi-label">Celkem dealů</span>
                            <span className="kpi-value">{animatedTotalDeals}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtry */}
            <div className="cr-filters-section glass-panel">
                <div className="filters-grid">
                    <div className="filter-item">
                        <label>Období (Měsíc)</label>
                        <select value={month} onChange={(e) => setMonth(e.target.value)} className="custom-month-select">
                            <option value="">Celá historie (Vše)</option>
                            {uniqueMonths.map((m) => (<option key={m} value={m}>{formatMonthName(m)}</option>))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Obchodník (Hledat)</label>
                        <input type="text" placeholder="Jméno..." value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label>Region</label>
                        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                            <option>Vše</option>
                            {regions.map((r) => (<option key={r}>{r}</option>))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Tým</label>
                        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
                            <option>Vše</option>
                            {teams.map((t) => (<option key={t}>{t}</option>))}
                        </select>
                    </div>
                </div>
                <div className="filters-actions">
                    <div className="active-filters">
                        {month ? formatMonthName(month) : 'Všechny měsíce'}
                        {regionFilter !== 'Vše' && ` | ${regionFilter}`}
                        {teamFilter !== 'Vše' && ` | ${teamFilter}`}
                    </div>
                    {(month || nameFilter || regionFilter !== 'Vše' || teamFilter !== 'Vše') && (
                        <button className="btn-clear" onClick={clearFilters}>× Vyčistit filtry</button>
                    )}
                </div>
            </div>

            {/* Zobrazení při prázdném výsledku hledání */}
            {filteredAndSorted.length === 0 ? (
                <div className="beautiful-empty-state glass-panel fade-in">
                    <div className="empty-icon">🔍</div>
                    <h3>Nenašli jsme žádné obchodníky</h3>
                    <p>Zadaným filtrům neodpovídají žádná data. Zkuste změnit hledaný výraz, měsíc nebo region.</p>
                    <button className="empty-btn-clear" onClick={clearFilters}>Vyčistit všechny filtry</button>
                </div>
            ) : (
                <>
                    {/* Top 3 stupně vítězů (Pódium) */}
                    {top3.length > 0 && (
                        <div className="cr-podium-section">
                            <div className="podium-container">
                                {top3[1] && (
                                    <div className="podium-card silver-place slide-up" style={{ animationDelay: '0.1s' }}>
                                        <div className="place-badge">🥈 2. místo</div>
                                        <img src={top3[1].avatar} alt={top3[1].fullNameWithoutTitles} className="trader-avatar" />
                                        <h3 className="trader-name">{top3[1].fullNameWithoutTitles}</h3>
                                        <div className={`trader-trend ${top3[1].trendPercent > 0 ? 'up' : 'down'}`}>
                                            {formatPercent(top3[1].trendPercent)}
                                        </div>
                                        <div className="trader-metrics">
                                            <div className="metric"><span>{top3[1].numberOfDeals}</span> dealů</div>
                                            <div className="metric highlight">{formatCurrency(top3[1].totalAmount)}</div>
                                        </div>
                                    </div>
                                )}
                                {top3[0] && (
                                    <div className="podium-card gold-place slide-up">
                                        {top3[0].badge && <span className="vip-badge">{top3[0].badge}</span>}
                                        <div className="place-badge">🏆 1. místo</div>
                                        <img src={top3[0].avatar} alt={top3[0].fullNameWithoutTitles} className="trader-avatar large" />
                                        <h3 className="trader-name">{top3[0].fullNameWithoutTitles}</h3>
                                        <div className={`trader-trend ${top3[0].trendPercent > 0 ? 'up' : 'down'}`}>
                                            {formatPercent(top3[0].trendPercent)}
                                        </div>
                                        <div className="trader-metrics">
                                            <div className="metric"><span>{top3[0].numberOfDeals}</span> dealů</div>
                                            <div className="metric highlight">{formatCurrency(top3[0].totalAmount)}</div>
                                        </div>
                                    </div>
                                )}
                                {top3[2] && (
                                    <div className="podium-card bronze-place slide-up" style={{ animationDelay: '0.2s' }}>
                                        <div className="place-badge">🥉 3. místo</div>
                                        <img src={top3[2].avatar} alt={top3[2].fullNameWithoutTitles} className="trader-avatar" />
                                        <h3 className="trader-name">{top3[2].fullNameWithoutTitles}</h3>
                                        <div className={`trader-trend ${top3[2].trendPercent > 0 ? 'up' : 'down'}`}>
                                            {formatPercent(top3[2].trendPercent)}
                                        </div>
                                        <div className="trader-metrics">
                                            <div className="metric"><span>{top3[2].numberOfDeals}</span> dealů</div>
                                            <div className="metric highlight">{formatCurrency(top3[2].totalAmount)}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Karty pro 4. - 6. místo */}
                    {places4to6.length > 0 && (
                        <div className="cr-runners-up fade-in" style={{ animationDelay: '0.3s' }}>
                            {places4to6.map((r, i) => (
                                <div key={r.id} className="runner-card glass-panel">
                                    <div className="runner-rank">{i + 4}.</div>
                                    <img src={r.avatar} alt={r.fullNameWithoutTitles} className="runner-avatar" />
                                    <div className="runner-info">
                                        <h4>{r.fullNameWithoutTitles} {r.badge && <span className="mini-badge">{r.badge}</span>}</h4>
                                        <p>{r.numberOfDeals} dealů • {formatCurrency(r.totalAmount)}</p>
                                    </div>
                                    <div className={`runner-trend ${r.trendPercent > 0 ? 'up' : 'down'}`}>
                                        {formatPercent(r.trendPercent)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Standardní tabulka pro zbývající data */}
                    {rest.length > 0 && (
                        <div className="cr-table-container glass-panel fade-in" style={{ animationDelay: '0.4s' }}>
                            <table className="cr-table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={() => handleSort('name')} className="sortable-th">
                                        <span className="th-content">Obchodník {getSortIcon('name')}</span>
                                    </th>
                                    <th onClick={() => handleSort('deals')} className="sortable-th">
                                        <span className="th-content">Dealy {getSortIcon('deals')}</span>
                                    </th>
                                    <th onClick={() => handleSort('value')} className="sortable-th">
                                        <span className="th-content">Hodnota {getSortIcon('value')}</span>
                                    </th>
                                    <th onClick={() => handleSort('trendPercent')} className="sortable-th">
                                        <span className="th-content">Trend {getSortIcon('trendPercent')}</span>
                                    </th>
                                    <th onClick={() => handleSort('sharePercent')} className="sortable-th">
                                        <span className="th-content">Podíl {getSortIcon('sharePercent')}</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {rest.map((r, idx) => (
                                    <tr key={r.id}>
                                        <td className="rank-cell"><span>{idx + 7}</span></td>
                                        <td>
                                            <div className="td-trader">
                                                <img src={r.avatar} alt={r.fullNameWithoutTitles} className="td-avatar" />
                                                <span className="td-name">{r.fullNameWithoutTitles}</span>
                                            </div>
                                        </td>
                                        <td className="deals-cell">{r.numberOfDeals}</td>
                                        <td className="value-cell">{formatCurrency(r.totalAmount)}</td>
                                        <td>
                                            <div className="trend-graphics-mini">
                                                <span className={`trend-badge ${r.trendPercent > 0 ? 'up' : 'down'}`}>
                                                    {r.trendPercent > 0 ? '↑' : '↓'} {Math.abs(r.trendPercent)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="share-bar-container">
                                                <span className="share-value">{r.sharePercent}%</span>
                                                <div className="share-track">
                                                    <div className="share-fill" style={{ width: `${r.sharePercent}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}