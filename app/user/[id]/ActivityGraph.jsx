import { useEffect, useState } from 'react';
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import CalendarHeatmap from 'react-calendar-heatmap';
import '@/app/user/[id]/activity-graph-styles.css';
import { Tooltip } from 'react-tooltip'

export default function ActivityGraph({ profileId }) {
    const [reads, setReads] = useState([]);
    const supabase = createSupabaseFrontendClient();
    console.log(profileId);
    useEffect(() => {
        async function fetchReads() {
            const { data, error } = await supabase
                .rpc('get_profile_saves', { profile_uuid: profileId })

            if (error) {
                throw error;
            }
            console.log(data);
            setReads(data);
        }

        fetchReads();
        console.log(reads)
    }, [])

    return (
        <div className="pt-4">
            <CalendarHeatmap
                startDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
                endDate={new Date()}
                values={reads}
                classForValue={value => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-${value.count}`;
                }}
                tooltipDataAttrs={value => {
                    return {
                        'data-tooltip-id': "data-tip",
                        'data-tooltip-content': `${value.count || 0} links read`,
                    };
                }}
            />
            <Tooltip id="data-tip" />
        </div>
    )
}